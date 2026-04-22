import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export function scrollReveal(node: HTMLElement) {
	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);

		const animation = gsap.from(node, {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: node,
				start: 'top 85%',
				toggleActions: 'play none none reverse'
			}
		});

		return {
			destroy() {
				animation.scrollTrigger?.kill();
				animation.kill();
			}
		};
	}
}
