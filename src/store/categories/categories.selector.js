/**
 * reduce always returns back a new object (hence the {})
 */
export const selectCategoriesMap = (state) => {
    console.log('SF - categories.selector.js fired', state);

    return state.categories.categories.reduce((accumulator, category) => {
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});
};
