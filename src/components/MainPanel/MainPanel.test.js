import MainPanel from './MainPanel';

const ctx = {};

describe('MainPanel', () => {
  test('it renders', () => {
    expect(MainPanel({ ctx, render: () => 'DEMO' })).toMatchSnapshot();
  });

  test('it passes the context to the render fn', () => {
    const render = jest.fn(() => '');
    MainPanel({ ctx, render });
    expect(render).toHaveBeenCalledWith(ctx);
  });
});
