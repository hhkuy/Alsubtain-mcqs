document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});

async function fetchCategories() {
    try {
        const response = await fetch('categories/index.json');
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error('خطأ في جلب الأقسام:', error);
    }
}

function displayCategories(categories) {
    const container = document.getElementById('categories-container');
    categories.forEach(category => {
        const card = document.createElement('div');
        card.classList.add('category-card');
        card.textContent = category.name;
        card.addEventListener('click', () => {
            window.location.href = `categories/${category.folder}/index.html`;
        });
        container.appendChild(card);
    });
}
