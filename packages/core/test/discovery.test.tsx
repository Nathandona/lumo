import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../src/components/lumo/search-bar'
import { SortSelect } from '../src/components/lumo/sort-select'
import { FilterPanel } from '../src/components/lumo/filter-panel'
import { Pagination } from '../src/components/lumo/pagination'
import { Breadcrumbs } from '../src/components/lumo/breadcrumbs'

describe('SearchBar', () => {
  it('clears the value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBar value="lamp" onValueChange={onChange} />)
    await user.click(screen.getByLabelText('Clear search'))
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('submits on enter', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<SearchBar value="lamp" onValueChange={vi.fn()} onSubmit={onSubmit} label="Search" />)
    await user.type(screen.getByLabelText('Search'), '{enter}')
    expect(onSubmit).toHaveBeenCalledWith('lamp')
  })

  it('hides the clear button while loading', () => {
    render(<SearchBar value="lamp" onValueChange={vi.fn()} loading />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })
})

describe('SortSelect', () => {
  it('emits the chosen value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SortSelect value="featured" onValueChange={onChange} />)
    await user.selectOptions(screen.getByLabelText('Sort by'), 'price-asc')
    expect(onChange).toHaveBeenCalledWith('price-asc')
  })
})

describe('FilterPanel', () => {
  const groups = [
    { id: 'size', label: 'Size', options: [{ value: 's', label: 'Small' }, { value: 'm', label: 'Medium' }] },
  ]

  it('adds a value when an option is checked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel groups={groups} value={{}} onValueChange={onChange} />)
    await user.click(screen.getByLabelText('Small'))
    expect(onChange).toHaveBeenCalledWith({ size: ['s'] })
  })

  it('shows an active count and clears all', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel groups={groups} value={{ size: ['s', 'm'] }} onValueChange={onChange} />)
    expect(screen.getByText('2')).toBeInTheDocument()
    await user.click(screen.getByText(/clear all/i))
    expect(onChange).toHaveBeenCalledWith({})
  })
})

describe('Pagination', () => {
  it('disables previous on the first page and navigates', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
    await user.click(screen.getByLabelText('Page 3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('renders nothing for a single page', () => {
    const { container } = render(<Pagination page={1} pageCount={1} onPageChange={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('Breadcrumbs', () => {
  it('marks the last crumb as the current page', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Lighting', href: '/lighting' },
          { label: 'Aurora Lamp' },
        ]}
      />
    )
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByText('Aurora Lamp')).toHaveAttribute('aria-current', 'page')
  })
})
