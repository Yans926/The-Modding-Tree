addLayer("e", {
    name: "Earth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "rgb(30, 164, 28)",
    requires: new Decimal(1),// Can be a function that takes requirement increases into account
    resource: "Earth essence", // Name of prestige currency
    baseResource: "mana", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
         let mult = new Decimal(1)
        if (hasUpgrade('e', 14)) mult = mult.times(upgradeEffect('e', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for Earth essences", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

        upgrades: {
            11: {
                title: "First essence",
                description: "You start feeling the mana around you.",
                cost: new Decimal(1)
            },
            
            12: {
                title: "Second essence",
                description: "Double essence = double mana gain",
                cost: new Decimal(1),
                unlocked() {return hasUpgrade("e", 11);
                    
                },
            },
            13: {
                 title: "It couldnt be that simple",
                description: "Earth essences raise Mana gain",
                cost: new Decimal(1),
                
                effect() {
                    return player[this.layer].points.add(1).pow(0.5)
                },
                effectDisplay() {
                    return format(upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect;
                unlocked() {return hasUpgrade("e", 12)},
            
                },

            14: {
                 title: "Wow it works in the other way too",
                description: "Mana gain raise Earth essences gain",
                cost: new Decimal(2),
                
                effect() {
                    return player.points.add(1).pow(0.15)
                },
                effectDisplay() {
                    return format(upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect;
                unlocked() {return hasUpgrade("e", 13)},
            
                }, 

            15: {
                title: "Something new",
                description: "Unlock the next element",
                cost: new Decimal(5),
                unlocked() {return hasUpgrade("e", 14);
                    
                },
        },
    }
})
    
addLayer("w", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "rgb(46, 110, 221)",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Water Essence", // Name of prestige currency
    baseResource: "mana", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for Water essences", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("e",15)},

        upgrades: {
            11: {title: "This one seems different",
                description: "Unlock a buyable",
                cost: new Decimal(1),
                unlocked() {return true;}
            }
        },
        buyables: { 
            rows: 1, // # of rows 
            cols: 1, // # of columns 
            11: { 
                cost(x) { 
                    return new Decimal(1).mul(2 || getBuyableAmt(this.layer, this.id)) 
                    },
                    display() { 
                        let currentCost = formatWhole(tmp[this.layer].buyables[this.id].cost);
    
                        return `Water conduct mana all around. <br>You get more max mana.<br><br>Cost: ${currentCost} points`;
                    },
                    canAfford() { 
                        return player[this.layer].points.gte(this.cost(1)) 
                    },
                    buy() {
                        player[this.layer].points = player[this.layer].points.sub(this.cost())
                        setBuyableAmount(this.layer, this.id, getBuyableAmt(this.layer, this.id).add(1))
                    },
                    
                }, 
                // etc... 
            }
    })
