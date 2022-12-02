import { createSelector } from 'reselect';

// IS LIKE SAYING - whats the determained value of categories
const selectCategoryReducer = (state) => {
    return state.categories;
};

// this is a memoize selector
// the first parameter is an array of input selectors, second is the output selector
export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => {
    return categoriesSlice.categories;
});

/**
 * SF - comment - reduce always returns back a new object (hence the {})
 *
 * createSelectors work with selectors, if they already ran,
 * then just return that, if not the fire off selector
 */
export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
    return categories.reduce((accumulator, category) => {
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});
});

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], (categoriesSlice) => {
    return categoriesSlice.isLoading;
});
