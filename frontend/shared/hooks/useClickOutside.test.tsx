import { fireEvent, render, screen } from '@testing-library/react';
import { useRef } from 'react';

import { useClickOutside } from './useClickOutside';

type TestComponentProps = {
  onClickOutside: () => void;
};

const TestComponent = ({ onClickOutside }: TestComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, onClickOutside);

  return <div ref={ref}>Inside</div>;
};

describe('useClickOutside', () => {
  it('uses the latest callback without recreating the document subscription', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const addEventListener = jest.spyOn(document, 'addEventListener');
    const removeEventListener = jest.spyOn(document, 'removeEventListener');

    const { rerender, unmount } = render(
      <TestComponent onClickOutside={firstCallback} />
    );
    const subscriptionsAfterRender = addEventListener.mock.calls.filter(
      ([eventName]) => eventName === 'mousedown'
    ).length;

    fireEvent.mouseDown(screen.getByText('Inside'));
    expect(firstCallback).not.toHaveBeenCalled();

    fireEvent.mouseDown(document.body);
    expect(firstCallback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent onClickOutside={secondCallback} />);
    fireEvent.mouseDown(document.body);

    expect(secondCallback).toHaveBeenCalledTimes(1);
    expect(
      addEventListener.mock.calls.filter(
        ([eventName]) => eventName === 'mousedown'
      )
    ).toHaveLength(subscriptionsAfterRender);

    unmount();
    expect(
      removeEventListener.mock.calls.some(
        ([eventName]) => eventName === 'mousedown'
      )
    ).toBe(true);
  });
});
