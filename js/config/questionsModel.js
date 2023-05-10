class QuestionsModel {
    static questions = [
        {
            question: "How do you typically commute to work or school?",
            answers: [
                "Drive alone in a personal car",
                "Carpool with others",
                "Use public transportation, such as a bus or train",
                "Use electric public transportation",
                "By bike or walk"
            ]
        },
        {
            question: "Do you prioritize organic, locally grown, or seasonal produce buying groceries?",
            answers: [
                "No, I do not",
                "Sometimes yes",
                "I started doing it more and more often",
                "I usually prioritize them",
                "I buy so many organic fruits and vegetables that I think I've started to photosynthesize"
            ]
        },
        {
            question: "How often do you buy new clothing or other items?",
            answers: [
                "Every week, I just can't live without new clothing",
                "Every month",
                "A few times a year when I want something new",
                "I buy new clothing or other items only when necessary",
                "I wear a lot of vintage clothing, so technically I'm recycling"
            ]
        },
        {
            question: "How much meat do you consume in your diet?",
            answers: [
                "I eat meat with every meal",
                "I eat meat every day",
                "I eat meat a few times a week",
                "I eat meat occasionally, such as on weekends or special occasions",
                "I never eat meat"
            ]
        },
        {
            question: "Do you own a car? If yes, how often do you fuel it?",
            answers: [
                "I own a car and I fuel it multiple times a week",
                "I own a car and I fuel it once a week",
                "I own a car and I fuel it several times per month",
                "I own a car but I rarely use it and fuel it only occasionally",
                "No, I do not own a car or I do not use it at all"
            ]
        },
        {
            question: "How frequently do you travel by airplane?",
            answers: [
                "Multiple times a month, I prioritize planes",
                "Nearly every month",
                "A few times a year",
                "I rarely travel by airplane, perhaps once a year",
                "I do not travel by airplane"
            ]
        },
        {
            question: "Do you prioritize buying sustainable clothing and products?",
            answers: [
                "No, I don't care about the environment or my fellow human beings",
                "I only wear biodegradable clothing, so don't be alarmed if you see me slowly disintegrating throughout the day",
                "Sustainability is not a top priority for me",
                "I try to choose sustainable options when I can, but sometimes convenience wins out",
                "I exclusively buy sustainable clothing and products"
            ]
        },
        {
            question: "Do you use energy-efficient appliances at home?",
            answers: [
                "No, I prefer to power my home with the force of my will",
                "I'm not sure if my appliances are energy-efficient or not",
                "I know that a half of my home electric items is energy-efficient",
                "I use energy-efficient appliances whenever possible",
                "I prioritize energy efficiency in my appliances"
            ]
        },
        {
            question: "Do you recycle regularly?",
            answers: [
                "No, not at all",
                "I rarely recycle, but I try to make up for it by using public transportation and conserving water",
                "I recycle when it's convenient",
                "I recycle regularly",
                "Absolutely, I recycle everything from cardboard boxes to my ex's love letters"
            ]
        },
        {
            question: "How often do you use public transportation?",
            answers: [
                "I only use my car",
                "I rarely use public transportation and mostly rely on my car",
                "I use public transportation occasionally when the traffic is insane so I can't drive",
                "I use public transportation most of the time",
                "I use public transportation exclusively and even avoid it when I can walk"
            ]
        },
        {
            question: "How often do you eat pre-packaged or processed foods?",
            answers: [
                "Mostly I eat pre-packaged or processed foods",
                "Very often",
                "I am a moderate eater of such food",
                "I occasionally eat pre-packaged or processed foods",
                "Rarely or never"
            ]
        },
        {
            question: "Do you use renewable energy sources like solar panels at home?",
            answers: [
                "No, I don't believe in renewable energy sources",
                "No, it's too expensive, but I would like to have something like that",
                "Yes, I believe in saving the planet with one solar panel at a time",
                "I have some solar panels and a tiny windmill in my garden",
                "Yes, I'm harnessing the power of the sun to fuel my home"
            ]
        },
        {
            question: "How often do you walk or ride a bike instead of driving?",
            answers: [
                "I never walk or ride a bike. Why use my legs when I have a good car?",
                "I rarely walk or ride a bike",
                "Occasionally",
                "I try to walk or ride a bike as often as possible",
                "I always walk or ride a bike, even when it's raining cats and dogs"
            ]
        },
        {
            question: "How often do you use single-use items like plastic bags or water bottles?",
            answers: [
                "I use single-use items pretty frequently",
                "I'm trying to cut down my plastic usage",
                "I rarely use single-use items, but I'm not perfect",
                "I almost never use single-use items and always carry a reusable water bottle and shopping bags",
                "I'm a sustainability superstar - I never use single-use items or plastic bottles"
            ]
        },
        {
            question: "Do you eat a lot of seafood or other animal products besides meat?",
            answers: [
                "I eat everything that walks, crawls, swims, or flies",
                "Not a lot",
                "I eat mostly plant-based foods, with occasional seafood, dairy, or eggs",
                "I am mostly vegetarian, with very little seafood, dairy, or eggs",
                "I am vegan, and do not consume any seafood, dairy, or eggs"
            ]
        },
        {
            question: "How often do you consume foods that require a lot of energy to produce?",
            answers: [
                "Very often - I consume a lot of processed and packaged foods that have traveled long distances to get to me",
                "Often enough",
                "Occasionally",
                "Almost never – I prioritize eating foods that have a minimal impact on the environment",
                "Never"
            ]
        },
        {
            question: "Do you participate in any activities that focus on sustainability or reducing carbon emissions?",
            answers: [
                "No, I haven't really thought about it",
                "No, but I try to educate myself on environmental issues and make sustainable choices in my daily life",
                "Yes, I support the environment",
                "Yes, I am involved in community initiatives that promote sustainability, such as community gardening, composting, or local clean-up efforts",
                "Yes, I regularly participate in environmental activism"
            ]
        },
        {
            question: "How often do you consume dairy products such as milk, cheese, or yogurt?",
            answers: [
                "With almost every meal",
                "A few times a day",
                "A few times a week",
                "Rarely",
                "I am vegan and do not consume dairy products at all"
            ]
        },
        {
            question: "Do you eat exotic fruits?",
            answers: [
                "I eat exotic fruits every day. I'm a tropical bird trapped in a human body.",
                "I eat exotic fruits occasionally, but I always feel guilty about the carbon footprint of my dragon fruit",
                "I try to stick to local fruits",
                "I only eat exotic fruits if they're sustainably sourced and ethically grown. Otherwise, I'll stick to my boring old apples.",
                "I only eat local fruits"
            ]
        },
        {
            question: "How often do you use plastic or other non-recyclable materials in your food storage?",
            answers: [
                "Only on days that end with 'y'",
                "Almost always as I don't know other options",
                "Sometimes I do that when there is no other choice",
                "Rarely",
                "Never"
            ]
        },
        {
            question: "How often do you use technology like smartphones, computers etc.?",
            answers: [
                "I use my smartphone and laptop 24/7",
                "I use technology every waking moment",
                "I'm trying to reduce, but...",
                "I prefer to communicate in real life, but I use my laptop for work",
                "I almost never use modern technologies, life is so beautiful without"
            ]
        }
    ];
    

    // Make the questions accessible without the need to instantiate the class
    static get_random() {
        const randomIndex = Math.floor(Math.random() * QuestionsModel.questions.length);
        return QuestionsModel.questions[randomIndex];
    }
}