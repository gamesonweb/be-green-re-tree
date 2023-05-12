class MilestoneController {
    constructor(gameGui) {
        this.gameGui = gameGui;
        this.milestones = [
            { level: 0, reached: false },
            { level: 5, reached: false },
            { level: 9, reached: false },
            { level: 12, reached: false },
            { level: 17, reached: false },
            { level: 21, reached: false },
            { level: 28, reached: false },
        ];
        this.milestoneTexts = {
            0: "You just arrived on a deserted island with dead trees. The sky is gray and there is no life, your mission is to reforest this island, you are the last chance.",
            5: "Well done, you got your first tree to Level 5, it's a pine and it collects more CO2 than dead trees! Now your island is becoming greener, Continue to reach Level 9!",
            9: "Congrats! You've reached Level 9, the sky is becoming lighter and you've got your first dark pine, it collects more CO2 than normal pine, try to reach Level 12.",
            12: "Amazing! You've got your first small oak and you now have moving grass on your island! The next milestone is Level 17.",
            17: "Incredible! You've unlocked your first major oak and it consumes even more CO2! Continue to the last milestone, Level 21.",
            21: "Now you are green! Your island is full of life. Why not challenge yourself and try to reach the ultimate tree level, 28?",
            28: "You are the best! You've reached the ultimate tree level, 28! Your island is now full of life and you've saved the planet!",
        };           
    }

    checkForMilestones(treeLevel) {
        this.milestones.forEach((milestone) => {
            if (treeLevel === milestone.level && !milestone.reached) {
                milestone.reached = true;
                // Get a random question from the CSV file
                let question = QuestionsModel.get_random();

                this.gameGui.showMilestoneMessage(question);
            }
        });
    }

    loadMilestones(trees) {
        const highestTreeLevel = Math.max(...trees.map(tree => tree.level));
        
        this.milestones.forEach(milestone => {
            if (highestTreeLevel >= milestone.level) {
                milestone.reached = true;
            }
        });
    }
}
