    // pages/menu.js or in any parent component
    "use client";

    import React from "react";
    import { Grid, GridItem } from "@chakra-ui/react"
    import MenuItem from "./MenuItem";

    function Menu() {
    const pandaMenuItems = [
        { name: "Orange Chicken", price: 7.99, description: "Crispy chicken bites tossed in a sweet and tangy orange sauce." },
        { name: "Kung Pao Chicken", price: 8.99, description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers." },
        { name: "Beijing Beef", price: 9.49, description: "Crispy beef tossed in a sweet-tangy sauce with peppers and onions." },
        { name: "Sweet Fire Chicken", price: 8.99, description: "Chicken breast in a sweet chili sauce with pineapples and peppers." },
        { name: "Grilled Teriyaki Chicken", price: 8.99, description: "Juicy grilled chicken thigh in a savory teriyaki sauce." },
        { name: "Honey Walnut Shrimp", price: 9.99, description: "Crispy shrimp tossed in a honey sauce with glazed walnuts." },
        { name: "Broccoli Beef", price: 7.99, description: "Tender beef with fresh broccoli in a savory ginger soy sauce." },
        { name: "Chow Mein", price: 6.99, description: "Stir-fried noodles with onions, celery, and cabbage." },
        { name: "Fried Rice", price: 6.99, description: "Classic fried rice with peas, carrots, and scrambled eggs." },
        { name: "Vegetable Spring Rolls", price: 3.99, description: "Crispy spring rolls filled with cabbage, carrots, and green onions." },
        { name: "Eggplant Tofu", price: 7.99, description: "Stir-fried tofu with eggplant, red bell peppers, and a sweet-spicy sauce." },
        { name: "Black Pepper Chicken", price: 8.99, description: "Diced chicken and vegetables in a bold black pepper sauce." },
    ];

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="6" paddingLeft={20}>
        {pandaMenuItems.map((item, index) => (
            <GridItem key={index}>
                <MenuItem
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    onAddToOrder={() => console.log(`Added ${item.name} to order`)}
                />
            </GridItem>
        ))}
        </Grid>
        
    );
    }

    export default Menu;
