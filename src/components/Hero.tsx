export const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Discover Your Perfect Recipe</h1>
                <p className="hero-subtitle">
                    Explore thousands of recipes from around the world. Find inspiration for your next meal
                    with our smart recipe finder powered by the MealDB database.
                </p>
            </div>
            <div className="hero-images">
                <div className="hero-image-container">
                    <img
                        src="https://cdn.loveandlemons.com/wp-content/uploads/2022/02/vegan-pasta.jpg"
                        alt="Delicious pasta dish"
                        className="hero-image"
                    />
                </div>
                <div className="hero-image-container">
                    <img
                        src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop"
                        alt="Fresh salad bowl"
                        className="hero-image"
                    />
                </div>
                <div className="hero-image-container">
                    <img
                        src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop"
                        alt="Grilled meat with vegetables"
                        className="hero-image"
                    />
                </div>
                <div className="hero-image-container">
                    <img
                        src="https://images.stockcake.com/public/c/2/b/c2b99cb6-4649-4f3b-8081-48ec87a1a18b_large/colorful-breakfast-bowl-stockcake.jpg"
                        alt="Colorful smoothie bowl"
                        className="hero-image"
                    />
                </div>
            </div>
        </section>
    );
};
