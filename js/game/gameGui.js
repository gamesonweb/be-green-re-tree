class GameGui {
    constructor(scene, userDataModel, audioModel) {
        this.scene = scene;
        this.userDataModel = userDataModel;
        this.userData = userDataModel.userData;
        // this.antModel = new AntModel(scene);
        // this.antView = new AntView(this.antModel, scene);
        // this.antController = new AntController(this.antModel, this.antView, scene);
        this.antModeActivated = false;

        this.GUI = BABYLON.GUI;
        this.advancedTexture = this.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        
        this.buildGui();
        
        this.audioModel = audioModel;
        this.audioController = this.createAudioController();
    }

    // Create the GUI components
    buildGui() {
        this.createScoreboardContainer();
        this.createUsernameContainer();
        this.createScoreText();
        this.createTreeStatsContainer();
        this.createTreeSlidersContainer();
        if(!this.userDataModel.visitor) {
            this.createUserMenuButton();
            this.createSaveButton();
            this.createResetButton();
        }
        this.createMusicButtons();
        this.createVolumeSlider();
        this.createLeaderboardButton();
    }

    showMilestoneRecap(lastMilestone, customText) {
        // Create a fullscreen UI
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

        // Create a StackPanel to hold the milestone recap message
        const recapPanel = new BABYLON.GUI.StackPanel();
        recapPanel.width = "400px";
        recapPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        recapPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(recapPanel);

        // Create a TextBlock for the custom text
        const customTextBlock = new BABYLON.GUI.TextBlock();
        customTextBlock.text = customText;
        customTextBlock.color = "white";
        customTextBlock.fontSize = 16;
        customTextBlock.height = "50px";
        customTextBlock.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
        recapPanel.addControl(customTextBlock);
        
        // Create a close button to dismiss the recap message
        const closeButton = BABYLON.GUI.Button.CreateSimpleButton("closeButton", "Close");
        closeButton.width = "100%";
        closeButton.height = "40px";
        closeButton.color = "white";
        closeButton.background = "black";
        closeButton.paddingTop = "2px";
        closeButton.paddingBottom = "2px";
        closeButton.onPointerUpObservable.add(() => {
            advancedTexture.removeControl(recapPanel);
        });
        recapPanel.addControl(closeButton);
    }

    showMilestoneMessage(question) {
        // Create a fullscreen UI
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Create a StackPanel to hold the question and answers
        const questionPanel = new BABYLON.GUI.StackPanel();
        questionPanel.width = "400px";
        questionPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        questionPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(questionPanel);

        // Create a TextBlock for the question
        const questionText = new BABYLON.GUI.TextBlock();
        questionText.text = "Milestone reach! Bonus question:\n" + question.question;
        questionText.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
        questionText.color = "white";
        questionText.fontSize = 18;
        questionText.height = "150px";
        questionPanel.addControl(questionText);

        // Create Buttons for the answers
        question.answers.forEach((answer, index) => {
            const answerButton = BABYLON.GUI.Button.CreateSimpleButton("answerButton" + index, answer);
            answerButton.width = "100%";
            answerButton.height = "60px";
            answerButton.color = "white";
            answerButton.background = "black";
            answerButton.paddingTop = "2px";
            answerButton.paddingBottom = "2px";
            answerButton.onPointerUpObservable.add(() => {
                advancedTexture.removeControl(questionPanel);

                // Display "Saving and loading next milestone..." message
                const savingMessage = new BABYLON.GUI.TextBlock();
                savingMessage.text = "Saving and loading next milestone...";
                savingMessage.color = "white";
                savingMessage.fontSize = 12;
                savingMessage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                savingMessage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                advancedTexture.addControl(savingMessage);

                let i = index * index;
                this.userDataModel.CO2 += i * this.userDataModel.CO2_per_sec;
                if (this.userDataModel.username) {
                    this.sendUserDataToAPI();
                } else {
                    console.log("You are a guest, you can't save your score");
                }
                // Dispose message and reload page after 3 seconds
                setTimeout(() => {
                    advancedTexture.removeControl(savingMessage);
                    location.reload();
                }, 3000);
            });
            questionPanel.addControl(answerButton);
        });
    }

    createUserMenuButton() {
        this.userMenuButton = this.GUI.Button.CreateSimpleButton("userMenuButton", "User Menu");
        this.userMenuButton.width = "100px";
        this.userMenuButton.height = "40px";
        this.userMenuButton.color = "white";
        this.userMenuButton.background = "blue";
        this.userMenuButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.userMenuButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.userMenuButton.top = "10px";
        this.userMenuButton.left = "-60px";
        this.userMenuButton.zIndex = 10; // Make sure the button is on top of other GUI elements
        this.advancedTexture.addControl(this.userMenuButton);
    }

    createLeaderboardButton() {
        this.scoreboardButton = this.GUI.Button.CreateSimpleButton("scoreboardButton", "Scoreboard");
        this.scoreboardButton.width = "120px";
        this.scoreboardButton.height = "40px";
        this.scoreboardButton.color = "white";
        this.scoreboardButton.background = "blue";
        this.scoreboardButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scoreboardButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.scoreboardButton.top = "10px";
        this.scoreboardButton.left = "-170px";
        this.scoreboardButton.zIndex = 10; // Make sure the button is on top of other GUI elements
        this.advancedTexture.addControl(this.scoreboardButton);
        // Add event listener
        this.scoreboardButton.onPointerClickObservable.add(() => {
            // Open in new tab the user menu page
            window.open("scoreboard.html", "_blank");
        });
    }

    /// Add this method to the GameGui class
    createAudioController() {
        this.audioController = new AudioController(this.audioModel, this);
        this.audioController.initListeners();
    }

    createMusicButtons() {
        // Mute/Unmute button
        this.toggleMuteButton = BABYLON.GUI.Button.CreateImageOnlyButton.call(this.GUI.Button, "toggleMuteButton", "assets/picto/unmute_icon.png");
        this.toggleMuteButton.width = "50px";
        this.toggleMuteButton.height = "50px";
        this.toggleMuteButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.toggleMuteButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.toggleMuteButton.paddingTop = "10px";
        this.toggleMuteButton.paddingRight = "10px";
        this.toggleMuteButton.zIndex = 1;
        this.toggleMuteButton.id = "toggleMuteButton";
        this.toggleMuteButton.onPointerClickObservable.add(() => {
            if(this.audioModel.muted) {
                this.toggleMuteButton.image.source = "assets/picto/mute_icon.png";
            } else {
                this.toggleMuteButton.image.source = "assets/picto/unmute_icon.png";
            }
        });
        this.advancedTexture.addControl(this.toggleMuteButton);
    }    

    createVolumeSlider() {
        this.volumeSlider = new this.GUI.Slider();
        this.volumeSlider.minimum = 0;
        this.volumeSlider.maximum = 100;
        this.volumeSlider.value = 50; // Set initial volume value
        this.volumeSlider.height = "20px";
        this.volumeSlider.width = "150px";
        this.volumeSlider.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.volumeSlider.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.volumeSlider.top = "60px";
        this.volumeSlider.right = "10px";
        this.volumeSlider.color = "white";
        this.volumeSlider.background = "black";
        this.volumeSlider.id = "volume-slider";
        this.advancedTexture.addControl(this.volumeSlider);
    }

    // Create slider
    createSlider(name, top) {
        let slider = new this.GUI.Slider(name);
        slider.width = "200px";
        slider.height = "20px";
        slider.color = "white";
        slider.background = "black";
        slider.value = 0.5;
        slider.minimum = -50;
        slider.maximum = 50;
        slider.top = top;
        slider.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        slider.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        // slider.onValueChangedObservable.add((value) => {
        //     console.log(name + " value changed to: " + value);
        // });

        return slider;
    }
    
    createTreeSlidersContainer() {
        this.treeSlidersContainer = new this.GUI.Rectangle("treeSlidersContainer");
        this.treeSlidersText = this.createTreeStatsTextBlock("Move tree", "10px");
        this.treeSlidersContainer.addControl(this.treeSlidersText);
        this.treeSlidersContainer.width = "460px";
        this.treeSlidersContainer.height = "120px";
        this.treeSlidersContainer.cornerRadius = 5;
        this.treeSlidersContainer.color = "white";
        this.treeSlidersContainer.thickness = 2;
        this.treeSlidersContainer.background = "rgba(0, 0, 0, 0.5)";
        this.treeSlidersContainer.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.treeSlidersContainer.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.treeSlidersContainer.paddingBottom = "10px"; // Increase padding to make space for the upgrade button
        this.treeSlidersContainer.paddingLeft = "240px";
        this.advancedTexture.addControl(this.treeSlidersContainer);

        // Create sliders
        this.sliderX = this.createSlider("Slider X", "40px");
        this.sliderZ = this.createSlider("Slider Z", "70px");
    
        // Add sliders to the container
        this.treeSlidersContainer.addControl(this.sliderX);
        this.treeSlidersContainer.addControl(this.sliderZ);
        this.treeSlidersContainer.isVisible = false;
    }

    // Tree stats container
    createTreeStatsContainer() {
        this.treeStatsContainer = new this.GUI.Rectangle("treeStatsContainer");
        this.treeStatsContainer.width = "220px";
        this.treeStatsContainer.height = "180px";
        this.treeStatsContainer.cornerRadius = 5;
        this.treeStatsContainer.color = "white";
        this.treeStatsContainer.thickness = 2;
        this.treeStatsContainer.background = "rgba(0, 0, 0, 0.5)";
        this.treeStatsContainer.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.treeStatsContainer.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.treeStatsContainer.paddingBottom = "70px"; // Increase padding to make space for the upgrade button
        this.treeStatsContainer.paddingLeft = "10px";
        this.advancedTexture.addControl(this.treeStatsContainer);
        this.treeStatsContainer.isVisible = false;


        this.treeIdText = this.createTreeStatsTextBlock("Tree's ID: -", "10px");
        this.treeLevelText = this.createTreeStatsTextBlock("Current Level: -", "40px");
        this.treeStatsContainer.addControl(this.treeIdText);
        this.treeStatsContainer.addControl(this.treeLevelText);
        
        this.upgradeCostText = this.createTreeStatsTextBlock("Upgrade Cost: -", "70px");
        this.treeStatsContainer.addControl(this.upgradeCostText);

        this.createUpgradeButton();
    }

    createUpgradeButton() {
        this.upgradeButton = this.GUI.Button.CreateSimpleButton("upgradeButton", "Upgrade Tree");
        this.upgradeButton.width = "220px";
        this.upgradeButton.height = "60px";
        this.upgradeButton.color = "white";
        this.upgradeButton.cornerRadius = 5;
        this.upgradeButton.background = "rgba(0, 0, 0, 0.5)";
        this.upgradeButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.upgradeButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.upgradeButton.paddingBottom = "10px";
        this.upgradeButton.paddingLeft = "10px";
        this.advancedTexture.addControl(this.upgradeButton);
        this.upgradeButton.isVisible = false;
    }

    showUpgradeButton(callback) {
        this.upgradeButton.isVisible = true;
        this.upgradeButton.onPointerUpObservable.clear();
        this.upgradeButton.onPointerUpObservable.add(callback);
    }

    hideUpgradeButton() {
        this.upgradeButton.isVisible = false;
    }

    updateUpgradeCost(upgradeCost) {
        this.upgradeCostText.text = `Upgrade Cost: ${upgradeCost}`;
    }

    createTreeStatsTextBlock(text, top) {
        const textBlock = new this.GUI.TextBlock();
        textBlock.text = text;
        textBlock.color = "white";
        textBlock.fontSize = 18; // Decrease font size
        textBlock.textHorizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER; // Center the text horizontally
        textBlock.textVerticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP; // Align the text to the top
        textBlock.top = top;
        return textBlock;
    }

    updateTreeStats(treeModel) {
        this.treeStatsContainer.isVisible = true;
        this.treeSlidersContainer.isVisible = true;
        // Set the initial values of the sliders based on the treeModel's position
        // this.sliderX.value = treeModel.x;
        // this.sliderZ.value = treeModel.z;
        
        this.treeIdText.text = `Tree's ID: ${treeModel.id}`;
        this.treeLevelText.text = `Current Level: ${treeModel.level}`;
    }

    hideTreeStats() {
        this.treeStatsContainer.isVisible = false;
        this.treeSlidersContainer.isVisible = false;
    }

    // Reset button
    createResetButton() {
        this.resetButton = this.GUI.Button.CreateSimpleButton("resetButton", "Reset Score");
        this.resetButton.width = "180px";
        this.resetButton.height = "40px";
        this.resetButton.color = "white";
        this.resetButton.cornerRadius = 5;
        this.resetButton.background = "rgba(0, 0, 0, 0.5)";
        this.resetButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.resetButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.resetButton.paddingBottom = "10px";
        this.resetButton.paddingRight = "10px";
        this.advancedTexture.addControl(this.resetButton);
    }

    // Score container
    createUsernameContainer() {
        this.UsernameContainer = new this.GUI.Rectangle("scoreboardContainer");
        this.UsernameContainer.width = "300px";
        this.UsernameContainer.height = "80px";
        this.UsernameContainer.cornerRadius = 5;
        this.UsernameContainer.color = "white";
        this.UsernameContainer.thickness = 2;
        this.UsernameContainer.background = "rgba(0, 0, 0, 0.5)";
        this.UsernameContainer.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.UsernameContainer.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.UsernameContainer.paddingTop = "10px";
        this.UsernameContainer.paddingLeft = "10px";
        this.advancedTexture.addControl(this.UsernameContainer);
        this.usernameText = new this.GUI.TextBlock();
        let username = "Guest";
        if (this.userDataModel.username) {
            username = this.userDataModel.username;
        }
        this.usernameText.text = "Welcome back\n" + username;
        this.usernameText.color = "white";
        this.usernameText.fontSize = 24;
        // this.usernameText.top = "15px";
        this.UsernameContainer.addControl(this.usernameText);
    }

    // Score container
    createScoreboardContainer() {
        this.scoreboardContainer = new this.GUI.Rectangle("scoreboardContainer");
        this.scoreboardContainer.width = "300px";
        this.scoreboardContainer.height = "80px";
        this.scoreboardContainer.cornerRadius = 5;
        this.scoreboardContainer.color = "white";
        this.scoreboardContainer.thickness = 2;
        this.scoreboardContainer.background = "rgba(0, 0, 0, 0.5)";
        this.scoreboardContainer.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scoreboardContainer.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.scoreboardContainer.paddingTop = "10px";
        this.scoreboardContainer.paddingLeft = "10px";
        this.advancedTexture.addControl(this.scoreboardContainer);
    }

    createScoreText() {
        this.scoreText = new this.GUI.TextBlock();
        this.scoreText.text = "CO2: 0";
        this.scoreText.color = "white";
        this.scoreText.fontSize = 24;
        this.scoreText.paddingTop = "-15px";
        this.scoreText2 = new this.GUI.TextBlock();
        this.scoreText2.text = "CO2/sec: 0";
        this.scoreText2.color = "white";
        this.scoreText2.fontSize = 24;
        this.scoreText2.top = "15px";
        // this.scoreText2.paddingTop = "24px";
        this.scoreboardContainer.addControl(this.scoreText2);
        this.scoreboardContainer.addControl(this.scoreText);
    }

    updateScoreText(value) {
        this.scoreText.text = `CO2: ${value}`;
    }

    updateScoreText2(value) {
        this.scoreText2.text = `CO2/sec: ${value}`;
    }

    // To move from here
    sendUserDataToAPI() {
        console.log('Sending user data to API');
        // event.preventDefault(); // Prevent page reload

        fetch(`${ConfigModel.get_url()}save_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: this.userDataModel.username, // Replace this with the actual username
                trees: JSON.stringify(this.userDataModel.trees),
                CO2: this.userDataModel.CO2,
                CO2_per_sec: this.userDataModel.CO2_per_sec,
            }),
        })
        .then(response => response.json())
        .then(console.log);
    }  

    // Ant mode
    createSaveButton() {
        this.antModeButton = this.GUI.Button.CreateSimpleButton("Save online", "Save online");
        this.antModeButton.width = "200px";
        this.antModeButton.height = "40px";
        this.antModeButton.color = "white";
        this.antModeButton.cornerRadius = 5;
        this.antModeButton.background = "rgba(0, 0, 0, 0.5)";
        this.antModeButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.antModeButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.antModeButton.paddingBottom = "10px";
        this.antModeButton.paddingRight = "10px";
        this.advancedTexture.addControl(this.antModeButton);

        this.antModeButton.onPointerUpObservable.add(() => {
            // If guest is !true, save with api
            if (this.userDataModel.username) {
                this.sendUserDataToAPI();
            } else {
                console.log("You are a guest, you can't save your score");
            }
        });
    }

    async toggleAntMode(activate) {
        if (activate) {
            console.log("Ant mode activated");
            this.antModeActivated = true;
    
            // Call createAnt method on the AntView instance
            await this.antView.createAnt();
            // await this.antView.init();
            this.antController.setupControls();
            this.scene.onBeforeRenderObservable.add(this.antControllerUpdateHandler);
        } else {
            console.log("Ant mode deactivated");
            this.antModeActivated = false;
            this.antView.antMesh.dispose(); // Remove the ant from the scene
            this.scene.onBeforeRenderObservable.remove(this.antControllerUpdateHandler);
        }
    }    

    antControllerUpdateHandler = () => {
        if (this.antModeActivated) {
            this.antController.update();
        }
    }
}
