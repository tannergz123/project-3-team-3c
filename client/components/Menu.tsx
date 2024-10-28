    // pages/menu.js or in any parent component
    "use client";

    import React from "react";
    import { VStack } from "@chakra-ui/react";
    import { Grid, GridItem } from "@chakra-ui/react"
    import MenuItem from "../components/MenuItem";

    function Menu() {
    const pandaMenuItems = [
        { name: "Orange Chicken", price: 7.99, description: "Tangy and spicy chicken." },
        { name: "Kung Pao Chicken", price: 8.99, description: "Spicy stir-fried chicken." },
        { name: "Beef Broccoli", price: 9.49, description: "Beef with fresh broccoli." },
        { name: "Orange Chicken", price: 7.99, description: "Tangy and spicy chicken." },
        { name: "Kung Pao Chicken", price: 8.99, description: "Spicy stir-fried chicken." },
        { name: "Beef Broccoli", price: 9.49, description: "Beef with fresh broccoli." },
        { name: "Orange Chicken", price: 7.99, description: "Tangy and spicy chicken." },
        { name: "Kung Pao Chicken", price: 8.99, description: "Spicy stir-fried chicken." },
        { name: "Beef Broccoli", price: 9.49, description: "Beef with fresh broccoli." },
        { name: "Orange Chicken", price: 7.99, description: "Tangy and spicy chicken." },
        { name: "Kung Pao Chicken", price: 8.99, description: "Spicy stir-fried chicken." },
        { name: "Orange Beef", price: 9.99, description: "Spicy beef with orange zest." },
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
