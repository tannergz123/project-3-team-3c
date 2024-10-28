    // pages/menu.js or in any parent component
    "use client";

    import React from "react";
    import { Grid, GridItem } from "@chakra-ui/react"
    import MenuItem from "../components/MenuItem";

    function Menu() {
    const pandaMenuItems = [
        { name: "Orange Panda", price: 7.99, description: "Tangy and spicy panda." },
        { name: "Kung Pao Panda", price: 8.99, description: "Spicy stir-fried panda." },
        { name: "Panda Broccoli", price: 9.49, description: "Panda with fresh broccoli." },
        { name: "Sweet Sesame Panda", price: 8.99, description: "Panda in a sweet sesame glaze." },
        { name: "Spicy Garlic Panda", price: 8.99, description: "Panda with a spicy garlic kick." },
        { name: "Panda Delight", price: 9.99, description: "Classic panda bites with veggies." },
        { name: "Honey Glazed Panda", price: 7.99, description: "Panda bites with honey glaze." },
        { name: "Teriyaki Panda", price: 8.99, description: "Panda in rich teriyaki sauce." },
        { name: "Panda Dumplings", price: 9.49, description: "Steamed dumplings with panda filling." },
        { name: "Orange Panda Stir-Fry", price: 7.99, description: "Tangy panda in a stir-fry." },
        { name: "Panda Lettuce Wraps", price: 8.99, description: "Fresh lettuce wraps with panda." },
        { name: "Zesty Panda Bites", price: 9.99, description: "Panda bites with a zesty finish." },
    ];

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap="6" paddingLeft={20}>
        {pandaMenuItems.map((item, index) => (
            <GridItem>
                <MenuItem
                    key={index}
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
