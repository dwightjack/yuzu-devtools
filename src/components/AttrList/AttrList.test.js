import AttrList from './AttrList';

describe('AttrList', () => {
  test('matches default snapshot', () => {
    expect(
      AttrList({
        ref: 'DEMO',
        detached: true,
      }),
    ).toMatchSnapshot();
  });
});
