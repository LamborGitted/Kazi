import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import BlogCard from '@/components/blog/BlogCard';

function renderWithProviders(ui: React.ReactNode) {
  return render(<ThemeProvider attribute="class" defaultTheme="system" enableSystem>{ui}</ThemeProvider>);
}

describe('BlogCard', () => {
  const mockProps = {
    slug: 'test-post',
    title: 'Test Post Title',
    date: '2026-04-25',
    excerpt: 'This is a test excerpt for the blog post.',
    tags: ['test', 'tech'],
    readingTime: 5,
    index: 0,
    minReadLabel: 'min read',
  };

  it('renders title correctly', () => {
    renderWithProviders(<BlogCard {...mockProps} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders excerpt', () => {
    renderWithProviders(<BlogCard {...mockProps} />);
    expect(screen.getByText('This is a test excerpt for the blog post.')).toBeInTheDocument();
  });

  it('renders tags', () => {
    renderWithProviders(<BlogCard {...mockProps} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('tech')).toBeInTheDocument();
  });

  it('renders reading time', () => {
    renderWithProviders(<BlogCard {...mockProps} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('has link to blog post', () => {
    const { container } = renderWithProviders(<BlogCard {...mockProps} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });
});