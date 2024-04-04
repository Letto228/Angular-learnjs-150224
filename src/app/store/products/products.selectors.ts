import {createFeatureSelector} from '@ngrx/store';
import {ProductsState, productsAdapter, productsFeature} from './products.state';

// export const productsFeatureSelector = (state: State) => state[productsFeature];
export const productsFeatureSelector = createFeatureSelector<ProductsState>(productsFeature);

// export const productsSelector = (state: State) => state[productsFeature].data;
// export const productsSelector = (state: State) => productsFeatureSelector(state).data;
// export const productsSelector = createSelector(
//     productsFeatureSelector,
//     (productsState: ProductsState) => productsState.data, // extractFn
// );
// export const productsSelector = (state: State) => extractFn(productsFeatureSelector(state))

// export const productsSelector = createSelector(
//     productsFeatureSelector,
//     ({entities, ids}: ProductsState) => ids.map(id => entities[id]), // extractFn
// );

// export const {
//     selectEntities,
//     selectIds,
//     selectAll,
// } = productsAdapter.getSelectors();

// export const productsEntitiesSelector = createSelector(
//     productsFeatureSelector,
//     selectEntities, // extractFn
//     // (productsState) => productsState.entities, // extractFn
// );

// export const productsIdsSelector = createSelector(
//     productsFeatureSelector,
//     selectIds, // extractFn
//     // (productsState) => productsState.ids, // extractFn
// );

// // export const productsSelector = createSelector(
// //     productsEntitiesSelector,
// //     productsIdsSelector,
// //     (entities, ids) => ids.map(id => entities[id]), // extractFn
// // );

// export const productsSelector = createSelector(
//     productsFeatureSelector,
//     selectAll, // extractFn
// );

export const {
    selectEntities: productsEntitiesSelector,
    selectIds: productsIdsSelector,
    selectAll: productsSelector,
} = productsAdapter.getSelectors(productsFeatureSelector);
