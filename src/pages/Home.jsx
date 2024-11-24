import React, { useCallback } from "react";
import { Categories, SortPopap, PizzaBlock } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import LoadingBlock from "../components/PizaaBlock/LoadingBlock";

const categoryName = [
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытие",
];

const sortItems = [
    { name: "популярности", type: "popular" },
    { name: "цене", type: "price" },
    { name: "алфавиту", type: "name" },
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    // Обновляем пиццы при каждом изменении категории
    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category)); // Передаем категорию в fetchPizzas
    }, [dispatch, sortBy, category]);

    const onSelectCategory = useCallback(
        (index) => {
            dispatch(setCategory(index));
        },
        [dispatch]
    );

    const onSelectSortType = useCallback(
        (type) => {
            dispatch(setSortBy(type));
        },
        [dispatch]
    );

    const hadleAddPizzaToCart = (obj) => {
        dispatch({
            type: "ADD_PIZZA_CART",
            payload: obj,
        });
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryName}
                />
                <SortPopap
                    activeSortType={sortBy}
                    items={sortItems}
                    onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                          <PizzaBlock
                              onClickAddPizza={hadleAddPizzaToCart}
                              key={obj.id}
                              addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                              {...obj}
                          />
                      ))
                    : Array(12)
                          .fill(0)
                          .map((_, index) => <LoadingBlock key={index} />)}
            </div>
        </div>
    );
}

export default Home;
