import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: any;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'center' | 'right';
    tag?: any;
    style?: React.CSSProperties;
    onLetterAnimationComplete?: () => void;
}

const SplitText = ({
    text,
    className = '',
    delay = 0.05, // stagger in seconds
    duration = 0.7,
    ease = [0.16, 1, 0.3, 1], // Power3 out equivalent

    threshold = 0.1,
    rootMargin = '-50px',
    textAlign = 'left',
    tag = 'h1',
    style = {},
    onLetterAnimationComplete
}: SplitTextProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: threshold, margin: rootMargin as any });

    const words = text.split(' ');

    const Tag = tag as any;

    return (
        <Tag
            ref={containerRef}
            className={`split-parent ${className}`}
            style={{
                textAlign,
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                ...style
            }}
        >
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        marginRight: '0.25em',
                        overflow: 'hidden',
                        verticalAlign: 'top',
                    }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{
                            duration: duration,
                            delay: wordIndex * delay,
                            ease: ease,
                        }}
                        onAnimationComplete={() => {
                            if (wordIndex === words.length - 1 && onLetterAnimationComplete) {
                                onLetterAnimationComplete();
                            }
                        }}
                        style={{ display: 'inline-block' }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
};

export default SplitText;
