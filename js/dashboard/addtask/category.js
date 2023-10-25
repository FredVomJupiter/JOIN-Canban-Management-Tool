/**
 * Renders the categories as options in the add task section.
 */
function renderCategories() {
    categories.forEach(category => {
        let categoryList = document.getElementById('addtaskMenuCategory');
        let option = document.createElement('option');
        option.value = category.id;
        option.text = category.name + " (" + category.color + ")";
        categoryList.appendChild(option);
    });
}