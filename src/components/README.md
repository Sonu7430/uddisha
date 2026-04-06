# CelebratoryModal Component

## Overview
The CelebratoryModal component provides a beautiful, animated celebration experience when users reach milestones during the career assessment (every 5 questions completed).

## Features

### Visual Design
- **Responsive Design**: Optimized for mobile (90% width), tablet (80% width), and desktop (400px width)
- **Gradient Backgrounds**: Beautiful blue-to-purple gradients matching the Uddisha brand
- **Confetti Animation**: 50 animated particles with realistic physics (gravity, rotation, velocity)
- **Progress Visualization**: Animated progress bar showing completion percentage

### Animations
- **Entry Animation**: Modal scales from 0.9 to 1 with ease-out timing
- **Confetti Physics**: Multi-colored particles with random velocities and rotation
- **Progress Bar**: Smooth fill animation with pulsing overlay effect
- **Icon Animation**: Bouncing trophy/checkmark with gradient background

### Accessibility
- **ARIA Labels**: Proper modal, dialog, and interactive element labeling
- **Keyboard Navigation**: Full keyboard support with focus trap
- **Escape Key**: Close modal with Escape key
- **Focus Management**: Automatic focus on first interactive element
- **Screen Reader**: Descriptive text for milestone achievements

### Content Structure
- **Dynamic Icons**: Trophy for major milestones (10, 20, etc.), checkmark for regular milestones
- **Milestone Messages**: Contextual congratulations based on progress
- **Progress Information**: Clear display of questions completed and remaining
- **Encouragement**: Motivational text to boost user engagement

## Usage

```tsx
import CelebratoryModal from './components/CelebratoryModal';
import { useCelebration } from './hooks/useCelebration';

// In your component
const { showCelebration, celebrationData, closeCelebration } = useCelebration({
  currentQuestion: questionIndex + 1,
  totalQuestions: totalQuestions,
  isEnabled: true
});

// Render the modal
{showCelebration && celebrationData && (
  <CelebratoryModal
    isOpen={showCelebration}
    onClose={closeCelebration}
    questionsCompleted={celebrationData.questionsCompleted}
    totalQuestions={celebrationData.totalQuestions}
    milestone={celebrationData.milestone}
  />
)}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | boolean | Controls modal visibility |
| `onClose` | function | Callback when modal should close |
| `questionsCompleted` | number | Number of questions completed |
| `totalQuestions` | number | Total number of questions |
| `milestone` | number | Current milestone number |

## Responsive Behavior

### Mobile (< 768px)
- 90% viewport width with 12px padding
- Smaller text sizes and icons
- Touch-optimized button sizes (min 44px)
- Reduced animation effects for performance

### Tablet (768px - 1024px)
- 80% viewport width with 16px padding
- Medium text sizes and spacing
- Balanced animation performance

### Desktop (> 1024px)
- Fixed 400px width with full padding
- Full animation effects and larger elements
- Enhanced hover states and transitions

## Animation Details

### Confetti System
- **Particle Count**: 50 particles per celebration
- **Colors**: Brand colors (indigo, teal, amber, red, purple, green)
- **Physics**: Gravity simulation with random velocities
- **Lifecycle**: Particles fade out when reaching bottom of screen

### Modal Entrance
- **Scale**: 0.9 → 1.0 with overshoot to 1.02
- **Opacity**: 0 → 1 with smooth transition
- **Duration**: 500ms with ease-out timing
- **Backdrop**: Blur effect with fade-in

### Progress Animation
- **Delay**: 300ms after modal appears
- **Duration**: 1000ms smooth fill
- **Effect**: Pulsing white overlay for visual interest

## Customization

The component uses Tailwind CSS classes and can be customized by:

1. **Colors**: Modify gradient classes for different brand colors
2. **Animations**: Adjust duration and easing in the style objects
3. **Content**: Update milestone messages and encouragement text
4. **Layout**: Modify responsive breakpoints and sizing

## Performance Considerations

- **Confetti Cleanup**: Particles are automatically removed when off-screen
- **Animation Optimization**: Uses transform and opacity for GPU acceleration
- **Memory Management**: Event listeners are properly cleaned up
- **Mobile Optimization**: Reduced particle count and simpler animations on smaller screens

## Browser Support

- **Modern Browsers**: Full feature support
- **IE11**: Graceful degradation without advanced animations
- **Mobile Safari**: Optimized for iOS with proper touch handling
- **Android Chrome**: Full support with performance optimizations