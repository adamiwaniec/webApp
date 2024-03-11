const bookData = [
    { id: 1, title: "To Kill a Mockingbird", description: "Harper Lee's poignant novel explores the themes of racism and innocence through the eyes of a young girl in the Deep South, revealing the profound impact of these issues on individuals and communities.", genre: "Classic Fiction", price: 18 },
    { id: 2, title: "1984", description: "George Orwell's dystopian masterpiece, 1984, delves into the grim world of totalitarianism, where surveillance and propaganda dominate society, stripping away freedom and individuality.", genre: "Science Fiction", price: 22 },
    { id: 3, title: "The Great Gatsby", description: "F. Scott Fitzgerald's The Great Gatsby is a scintillating tale of wealth, love, and deceit set against the backdrop of the roaring 1920s, exposing the hollow core of the American Dream.", genre: "Historical Fiction", price: 27 },
    { id: 4, title: "Pride and Prejudice", description: "Jane Austen's Pride and Prejudice is a timeless romantic novel that elegantly portrays the dance of manners, marriage, and misjudgments in the British gentry of the early 19th century.", genre: "Romance", price: 19 },
    { id: 5, title: "The Catcher in the Rye", description: "J.D. Salinger's The Catcher in the Rye is a powerful narrative about teenage rebellion and alienation, capturing the deep uncertainties and existential crises of youth.", genre: "Literary Fiction", price: 15 },
    { id: 6, title: "The Hobbit", description: "J.R.R. Tolkien's The Hobbit is an enthralling fantasy adventure, inviting readers into the richly imagined world of Middle-earth, where hobbits, dragons, and unexpected journeys await.", genre: "Fantasy", price: 29 },
    { id: 7, title: "The Da Vinci Code", description: "Dan Brown's The Da Vinci Code is a riveting mystery that weaves together secret societies, ancient mysteries, and a relentless quest for truth, set against Europe's historic landmarks.", genre: "Mystery", price: 33 },
    { id: 8, title: "Sapiens", description: "Yuval Noah Harari's Sapiens offers a compelling overview of human history, exploring how Homo sapiens came to dominate the Earth and the complex evolution of our societies and cultures.", genre: "Non-Fiction", price: 40 },
    { id: 9, title: "Life of Pi", description: "Yann Martel's Life of Pi is an extraordinary tale of survival, faith, and the boundless limits of imagination, as a young boy and a Bengal tiger face the vastness of the Pacific Ocean alone.", genre: "Adventure", price: 30 },
    { id: 10, title: "Gone Girl", description: "Gillian Flynn's Gone Girl is a masterful psychological thriller that dissects a marriage gone terribly wrong, unveiling the complexities and dark twists of love and betrayal.", genre: "Thriller", price: 25 },
    { id: 11, title: "The Alchemist", description: "Paulo Coelho's The Alchemist is a philosophical and inspirational story that follows a young Andalusian shepherd in his quest to discover his destiny and the treasures within himself.", genre: "Fiction", price: 17 },
    { id: 12, title: "Atomic Habits", description: "James Clear's Atomic Habits offers transformative insights into how tiny changes can lead to remarkable results, providing a practical framework for mastering the habits that shape our lives.", genre: "Self-Help", price: 21 },
    { id: 13, title: "The Book Thief", description: "Markus Zusak's The Book Thief is a heart-wrenching story set in Nazi Germany, telling the tale of a young girl's bond with books and the power of words in the darkest times.", genre: "Historical Fiction", price: 26 },
    { id: 14, title: "Educated", description: "Tara Westover's Educated is a gripping memoir that recounts her journey from a survivalist family in Idaho to earning a PhD from Cambridge University, exploring themes of family, knowledge, and self-invention.", genre: "Memoir", price: 24 },
    { id: 15, title: "Dune", description: "Frank Herbert's Dune is an epic saga of politics, religion, and power, set on the desert planet of Arrakis, where the coveted spice melange influences the fate of the galaxy.", genre: "Science Fiction", price: 37 },
    { id: 16, title: "Beloved", description: "Toni Morrison's Beloved is a profound narrative on the scars of slavery, weaving a haunting story of a mother and her child, set against the backdrop of post-Civil War America.", genre: "Historical Fiction", price: 21 },
    { id: 17, title: "American Gods", description: "Neil Gaiman's American Gods is a mesmerizing blend of mythology, fantasy, and Americana, exploring the gods of old and new as they navigate the landscape of modern America.", genre: "Fantasy", price: 23 },
    { id: 18, title: "The Power of Now", description: "Eckhart Tolle's The Power of Now is an enlightening guide to spiritual awakening, offering profound insights into living in the present and transcending our ego-bound state of consciousness.", genre: "Spirituality", price: 29 },
    { id: 19, title: "The Subtle Art of Not Giving a F*ck", description: "Mark Manson's The Subtle Art of Not Giving a F*ck challenges conventional self-help advice, advocating for a more stoic approach to living a content and grounded life.", genre: "Self-Help", price: 18 },
    { id: 20, title: "A Brief History of Time", description: "Stephen Hawking's A Brief History of Time is an iconic exploration of the cosmos, delving into the nature of space and time, black holes, and the origins of the universe.", genre: "Science", price: 22 },
    { id: 21, title: "Frankenstein", description: "Mary Shelley's Frankenstein is a groundbreaking gothic novel that delves into the moral ramifications of playing god, telling the tragic story of a scientist and the creature he brings to life.", genre: "Horror", price: 16 },
    { id: 22, title: "Becoming", description: "Michelle Obama's Becoming is an intimate and inspiring memoir, detailing her journey from the South Side of Chicago to the White House, and her role as a mother, wife, and First Lady.", genre: "Memoir", price: 24 },
    { id: 23, title: "The Night Circus", description: "Erin Morgenstern's The Night Circus is a captivating tale of illusion, love, and rivalry, set within the magical confines of a circus that appears without warning and leaves audiences spellbound.", genre: "Fantasy", price: 25 },
    { id: 24, title: "The Fault in Our Stars", description: "John Green's The Fault in Our Stars is a poignant and heartfelt story of two young cancer patients who find love and meaning in the face of their mortality, challenging the boundaries of life and death.", genre: "Romance", price: 19 },
    { id: 25, title: "Invisible Man", description: "Ralph Ellison's Invisible Man is a powerful exploration of race, identity, and social invisibility in America, following the journey of a young African American man navigating a society that refuses to see him.", genre: "Fiction", price: 20 },
    { id: 26, title: "The Silent Patient", description: "Alex Michaelides' The Silent Patient is a gripping psychological thriller that unveils the mystery of a woman's silence after she is accused of murdering her husband, and the psychotherapist obsessed with uncovering her motive.", genre: "Thriller", price: 28 },
    { id: 27, title: "Where the Crawdads Sing", description: "Delia Owens' Where the Crawdads Sing is a mesmerizing tale of mystery, survival, and the deep connections between humans and nature, set in the quiet town of Barkley Cove.", genre: "Mystery", price: 26 },
    { id: 28, title: "The Road", description: "Cormac McCarthy's The Road is a stark and powerful narrative of a father and son's journey through a desolate, post-apocalyptic landscape, exploring themes of survival, love, and the essence of humanity.", genre: "Dystopian", price: 23 },
    { id: 29, title: "Normal People", description: "Sally Rooney's Normal People is an intricate examination of love, friendship, and the complexities of human connection, tracing the intertwined lives of two individuals as they navigate adulthood.", genre: "Literary Fiction", price: 21 },
    { id: 30, title: "The Four Agreements", description: "Don Miguel Ruiz's The Four Agreements offers a practical guide to personal freedom, based on ancient Toltec wisdom, that challenges us to transform our lives through truth, love, and self-reflection.", genre: "Self-Help", price: 17 }
];

export default bookData;