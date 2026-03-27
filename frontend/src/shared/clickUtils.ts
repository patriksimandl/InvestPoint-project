import type { Dispatch, RefObject, SetStateAction } from 'react';

export function isClickOutsideRefs(
  event: MouseEvent,
  refs: Array<RefObject<HTMLElement | null>>
): boolean {
  const target = event.target;

  if (!(target instanceof Node)) {
    return true;
  }

  return refs.every((ref) => {
    const element = ref.current;
    return !element || !element.contains(target);
  });
}

export function createOutsideClickHandler(
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  refs: Array<RefObject<HTMLElement | null>>
) {
  return function handleOutsideClick(event: MouseEvent) {
    if (isActive && isClickOutsideRefs(event, refs)) {
      setIsActive(false);
    }
  };
}
