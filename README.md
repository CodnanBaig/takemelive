# Take Me Live - Next.js Portfolio with Custom Cursor & Hover Effects

A modern Next.js portfolio website featuring custom cursor animations and text reveal effects inspired by [Minh Pham's portfolio](https://minhpham.design/).

## ✨ Features

- **Custom Cursor**: Smooth, animated cursor with hover state detection
- **Text Reveal Effects**: Multiple reveal directions (up, left) with smooth animations
- **Magnetic Effects**: Optional magnetic attraction for interactive elements
- **Accessibility**: Screen reader support and reduced motion preferences
- **Responsive**: Works on both desktop and mobile devices
- **TypeScript**: Full type safety and modern development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd takemelive

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the main site.

Visit [http://localhost:3000/demo](http://localhost:3000/demo) to see all hover effects in action.

## 🎯 Components

### CustomCursor

A global custom cursor component that provides smooth tracking and hover state detection.

```tsx
import CustomCursor from '@/components/CustomCursor';

// Add to your layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
```

**Features:**
- Smooth cursor tracking with easing
- Automatic hover state detection
- Click animations
- Optional magnetic effects
- Mobile-friendly (disables on mobile)

### HoverReveal

A versatile component for creating text reveal effects on hover.

```tsx
import HoverReveal from '@/components/HoverReveal';

// Basic usage
<HoverReveal text="Hover over me" />

// With custom direction
<HoverReveal text="Left reveal" dir="left" />

// With outlined effect
<HoverReveal text="Outlined text" outlined />

// As a button
<HoverReveal 
  text="Click me" 
  as="button" 
  onClick={() => alert('Clicked!')} 
/>

// As a link
<HoverReveal 
  text="External link" 
  href="https://example.com" 
  target="_blank" 
/>

// With magnetic effect
<HoverReveal text="Magnetic text" magnetic />
```

**Props:**
- `text`: The text to display
- `as`: HTML element type (default: "a")
- `href`: URL for links
- `dir`: Reveal direction ("up" | "left", default: "up")
- `outlined`: Whether to use outlined effect for bottom layer
- `magnetic`: Enable magnetic attraction effect
- `className`: Additional CSS classes
- `onClick`: Click handler for buttons
- `children`: Custom content (overrides text prop)

## 🎨 Customization

### CSS Variables

The components use CSS custom properties for easy theming:

```css
:root {
  --cursor-size: 16px;
  --cursor-hover-size: 36px;
  --ease: cubic-bezier(.2,.8,.2,1);
  --dur: 400ms;
  --bg: #0e0e0e;
  --fg: #f3f3f3;
  --muted: #a0a0a0;
}
```

### Styling

All components are fully customizable via CSS:

```css
/* Custom cursor styles */
#cursor {
  border-color: #your-color;
  background: rgba(255,255,255,0.1);
}

/* Hover reveal animations */
.hover-reveal .reveal-text {
  transition-duration: 500ms;
}
```

## ♿ Accessibility

- **Screen Readers**: Hidden text labels for screen readers
- **Focus States**: Focus-visible styles that mirror hover effects
- **Reduced Motion**: Automatically disables animations for users with motion sensitivity
- **Keyboard Navigation**: Full keyboard support for all interactive elements

## 📱 Mobile Support

- Custom cursor automatically disables on mobile devices
- Hover effects gracefully degrade to standard interactions
- Touch-friendly interactions maintained

## 🔧 Advanced Usage

### Magnetic Effects

Add magnetic attraction to any element:

```tsx
<div data-magnetic>
  <HoverReveal text="This will attract the cursor" />
</div>
```

### Custom Hover States

Elements with `data-cursor="hover"` will trigger cursor hover state:

```tsx
<div data-cursor="hover">
  Custom hover area
</div>
```

### Performance Optimization

The components use:
- `will-change` for optimized animations
- `requestAnimationFrame` for smooth cursor tracking
- Passive event listeners for better scroll performance
- WeakMap for efficient element tracking

## 🎭 Animation Details

### Cursor Easing
- **Tracking**: 0.18 ease factor for smooth following
- **Hover**: 0.25s cubic-bezier(.2,.8,.2,1) for size changes
- **Click**: 0.2s ease for opacity changes

### Text Reveal
- **Duration**: 400ms (configurable via CSS)
- **Easing**: cubic-bezier(.2,.8,.2,1) for natural motion
- **Directions**: Up (translateY) and Left (translateX)

## 📚 Examples

Check out the demo page at `/demo` for comprehensive examples of all features:

- Text reveal effects in different directions
- Interactive buttons and links
- Magnetic effects
- Navigation examples
- Feature showcase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Minh Pham's portfolio](https://minhpham.design/)
- Built with Next.js 14 and TypeScript
- Uses modern CSS features and best practices

---

**Note**: The custom cursor and hover effects are designed for desktop experiences. On mobile devices, these features gracefully degrade to provide a consistent user experience across all devices.
