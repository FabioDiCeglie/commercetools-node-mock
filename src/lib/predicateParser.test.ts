import { matchesPredicate } from './predicateParser'

describe('Predicate filter', () => {
  const object = {
    stringProperty: 'foobar',
    numberProperty: 1234,
    myNestedValue: {
      objectProperty: {
        stringProperty: 'foobar',
      },
    },
  }
  test('string value', async () => {
    expect(matchesPredicate(`stringProperty="foobar"`, object)).toBeTruthy()
  })

  test('multiple string value', async () => {
    expect(
      matchesPredicate(
        [`stringProperty="foobar"`, `numberProperty=1234`],
        object
      )
    ).toBeTruthy()

    expect(
      matchesPredicate(
        [`stringProperty="foobar"`, `numberProperty=1111`],
        object
      )
    ).toBeFalsy()
  })

  test('number value equals', async () => {
    expect(matchesPredicate(`numberProperty=1234`, object)).toBeTruthy()
    expect(matchesPredicate(`numberProperty = 1234`, object)).toBeTruthy()
  })

  test('number value greater then', async () => {
    expect(matchesPredicate(`numberProperty > 1233`, object)).toBeTruthy()
    expect(matchesPredicate(`numberProperty > 1234`, object)).toBeFalsy()
  })

  test('number value lesser then', async () => {
    expect(matchesPredicate(`numberProperty < 1235`, object)).toBeTruthy()
    expect(matchesPredicate(`numberProperty < 1234`, object)).toBeFalsy()
  })

  test('nested string value', async () => {
    expect(
      matchesPredicate(
        `myNestedValue(objectProperty(stringProperty="foobar"))`,
        object
      )
    ).toBeTruthy()
  })

  test('is defined known property', async () => {
    expect(
      matchesPredicate(
        `numberProperty is defined`,
        object
      )
    ).toBeTruthy()
  })

  test('is defined unknown property', async () => {
   expect(
      matchesPredicate(
        `unknownProperty is defined`,
        object
      )
    ).toBeFalsy()
  })

  test('is not defined known property', async () => {
    expect(
      matchesPredicate(
        `numberProperty is not defined`,
        object
      )
    ).toBeFalsy()

  })

  test('is not defined unknown property', async () => {
   expect(
      matchesPredicate(
        `unknownProperty is not defined`,
        object
      )
    ).toBeTruthy()
  })
})
