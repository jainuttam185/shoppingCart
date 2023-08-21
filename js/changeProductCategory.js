class changeProductCategory{

    constructor(){
        console.log('Products click');
        localStorage.setItem("SHOWCATEGORY", "5b6899953d1a866534f516e2");
    }

    changeCategory(productCategory) {
        localStorage.setItem("SHOWCATEGORY", productCategory);
    }

    renderProductPage(category) {
        this.changeCategory(category);
        window.location = "/products.html";

    }

    changeProductCategoryButton() {
        const DOMButtonsProductPage = document.querySelectorAll(".product-category-button");
        const arrayButtonDOM = [ ...DOMButtonsProductPage ];

        arrayButtonDOM.map((button) => {
            button.addEventListener('click', () => {
                this.renderProductPage(button.value);
            })
        })
    }

}

const buttonToChangeProduct = new changeProductCategory();
buttonToChangeProduct.changeProductCategoryButton();