import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'blur-in'
  | 'slide-up'
  | 'stagger';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;       // delay in ms
  duration?: number;    // duration in ms
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Wrapper component that animates children when they scroll into view.
 * 
 * Usage:
 *   <ScrollReveal animation="fade-up" delay={100}>
 *     <YourContent />
 *   </ScrollReveal>
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = '',
  style = {},
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  const animationClasses: Record<AnimationType, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
    'fade-up': {
      hidden: { opacity: 0, transform: 'translateY(40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-down': {
      hidden: { opacity: 0, transform: 'translateY(-40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-left': {
      hidden: { opacity: 0, transform: 'translateX(-50px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'fade-right': {
      hidden: { opacity: 0, transform: 'translateX(50px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'zoom-in': {
      hidden: { opacity: 0, transform: 'scale(0.85)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    'zoom-out': {
      hidden: { opacity: 0, transform: 'scale(1.15)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    'flip-up': {
      hidden: { opacity: 0, transform: 'perspective(800px) rotateX(15deg) translateY(30px)' },
      visible: { opacity: 1, transform: 'perspective(800px) rotateX(0deg) translateY(0)' },
    },
    'blur-in': {
      hidden: { opacity: 0, filter: 'blur(12px)', transform: 'translateY(20px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
    },
    'slide-up': {
      hidden: { opacity: 0, transform: 'translateY(60px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'stagger': {
      hidden: { opacity: 0, transform: 'translateY(30px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
  };

  const currentAnimation = animationClasses[animation];
  const activeStyle = isVisible ? currentAnimation.visible : currentAnimation.hidden;

  const Comp = Component as any;

  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        ...style,
        ...activeStyle,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Comp>
  );
};

export default ScrollReveal;
