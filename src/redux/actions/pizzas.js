import axios from "axios";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(setLoaded(false));

    axios.get("/pizzas").then(({ data }) => {
        let filteredData = data;

        // Фильтрация по категории
        if (category !== null) {
            filteredData = filteredData.filter(
                (item) => item.category === category
            );
        }

        // Сортировка по выбранному типу
        if (sortBy) {
            filteredData = filteredData.sort((a, b) => {
                if (sortBy === "price") return b.price - a.price;
                if (sortBy === "popular") return b.rating - a.rating;
                if (sortBy === "name") return a.name.localeCompare(b.name); // Используйте 'name' для сортировки по имени
                return 0;
            });
        }

        dispatch(setPizzas(filteredData));
        dispatch(setLoaded(true));
    });
};

export const setPizzas = (items) => ({
    type: "SET_PIZZAS",
    payload: items,
});
