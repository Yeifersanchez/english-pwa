/*
 * Aprende Inglés PWA
 *
 * This script powers the interactive behaviour of the Progressive Web App.
 * It manages application state, navigation, spaced‑repetition scheduling
 * and basic gamification elements like points, streaks and badges. All
 * user data is stored locally using localStorage so the app can work
 * entirely offline once loaded.
 */

(function () {
  // ---------------------------------------------------------------------------
  // Data definitions
  //
  // Each unit contains a set of lessons. A lesson has an id, the English
  // phrase, its Spanish translation and a type (word or phrase). You can
  // extend these arrays to include more vocabulary. These lists currently
  // cover basic introductions, essential vocabulary and simple grammar. If
  // you wish to meet the 300–400 word target you should add additional
  // entries here or load them from an external JSON file.
  // ---------------------------------------------------------------------------
  const units = [
    {
      id: 1,
      name: 'Introducción al inglés',
      lessons: [
        { id: 'u1-1', eng: 'Hello', es: 'Hola' },
        { id: 'u1-2', eng: 'Goodbye', es: 'Adiós' },
        { id: 'u1-3', eng: 'Please', es: 'Por favor' },
        { id: 'u1-4', eng: 'Thank you', es: 'Gracias' },
        { id: 'u1-5', eng: 'Yes', es: 'Sí' },
        { id: 'u1-6', eng: 'No', es: 'No' },
        { id: 'u1-7', eng: "I'm sorry", es: 'Lo siento' },
        { id: 'u1-8', eng: 'Good morning', es: 'Buenos días' },
        { id: 'u1-9', eng: 'Good night', es: 'Buenas noches' },
        { id: 'u1-10', eng: 'My name is...', es: 'Mi nombre es...' },
        { id: 'u1-11', eng: 'How are you?', es: '¿Cómo estás?' },
        { id: 'u1-12', eng: "I'm fine", es: 'Estoy bien' },
        { id: 'u1-13', eng: 'Nice to meet you', es: 'Mucho gusto' },
        { id: 'u1-14', eng: 'Where is the bathroom?', es: '¿Dónde está el baño?' },
        { id: 'u1-15', eng: "I don't understand", es: 'No entiendo' },
        { id: 'u1-16', eng: 'Speak slowly please', es: 'Habla despacio, por favor' },
      ],
    },
    {
      id: 2,
      name: 'Vocabulario esencial',
      lessons: [
        { id: 'u2-1', eng: 'Mother', es: 'Madre' },
        { id: 'u2-2', eng: 'Father', es: 'Padre' },
        { id: 'u2-3', eng: 'Brother', es: 'Hermano' },
        { id: 'u2-4', eng: 'Sister', es: 'Hermana' },
        { id: 'u2-5', eng: 'Son', es: 'Hijo' },
        { id: 'u2-6', eng: 'Daughter', es: 'Hija' },
        { id: 'u2-7', eng: 'Husband', es: 'Esposo' },
        { id: 'u2-8', eng: 'Wife', es: 'Esposa' },
        { id: 'u2-9', eng: 'Friend', es: 'Amigo/Amiga' },
        { id: 'u2-10', eng: 'House', es: 'Casa' },
        { id: 'u2-11', eng: 'Food', es: 'Comida' },
        { id: 'u2-12', eng: 'Water', es: 'Agua' },
        { id: 'u2-13', eng: 'Bread', es: 'Pan' },
        { id: 'u2-14', eng: 'Coffee', es: 'Café' },
        { id: 'u2-15', eng: 'Milk', es: 'Leche' },
        { id: 'u2-16', eng: 'Restaurant', es: 'Restaurante' },
        { id: 'u2-17', eng: 'Supermarket', es: 'Supermercado' },
        { id: 'u2-18', eng: 'Bus', es: 'Autobús' },
        { id: 'u2-19', eng: 'Taxi', es: 'Taxi' },
        { id: 'u2-20', eng: 'Airport', es: 'Aeropuerto' },
      ],
    },
    {
      id: 3,
      name: 'Gramática básica y estructura',
      lessons: [
        { id: 'u3-1', eng: 'I am', es: 'Yo soy / Yo estoy' },
        { id: 'u3-2', eng: 'You are', es: 'Tú eres / Tú estás' },
        { id: 'u3-3', eng: 'He is', es: 'Él es / Él está' },
        { id: 'u3-4', eng: 'She is', es: 'Ella es / Ella está' },
        { id: 'u3-5', eng: 'We are', es: 'Nosotros somos / Nosotros estamos' },
        { id: 'u3-6', eng: 'They are', es: 'Ellos son / Ellos están' },
        { id: 'u3-7', eng: 'I have', es: 'Yo tengo' },
        { id: 'u3-8', eng: 'You have', es: 'Tú tienes' },
        { id: 'u3-9', eng: 'He has', es: 'Él tiene' },
        { id: 'u3-10', eng: 'She has', es: 'Ella tiene' },
        { id: 'u3-11', eng: 'We have', es: 'Nosotros tenemos' },
        { id: 'u3-12', eng: 'They have', es: 'Ellos tienen' },
        { id: 'u3-13', eng: 'Do you want to ...?', es: '¿Quieres ...?' },
        { id: 'u3-14', eng: 'I like', es: 'Me gusta' },
        { id: 'u3-15', eng: 'I need', es: 'Necesito' },
        { id: 'u3-16', eng: 'I want', es: 'Quiero' },
        { id: 'u3-17', eng: "I don't like", es: 'No me gusta' },
        { id: 'u3-18', eng: 'Where do you live?', es: '¿Dónde vives?' },
        { id: 'u3-19', eng: 'What is your name?', es: '¿Cómo te llamas?' },
        { id: 'u3-20', eng: 'How old are you?', es: '¿Cuántos años tienes?' },
      ],
    },
    {
      id: 4,
      name: 'Escucha y habla',
      lessons: [
        { id: 'u4-1', eng: 'Where is the ...?', es: '¿Dónde está el/la ...?' },
        { id: 'u4-2', eng: 'How much is it?', es: '¿Cuánto cuesta?' },
        { id: 'u4-3', eng: 'Can you help me?', es: '¿Puedes ayudarme?' },
        { id: 'u4-4', eng: 'Could you repeat that?', es: '¿Podrías repetir eso?' },
        { id: 'u4-5', eng: 'Good afternoon', es: 'Buenas tardes' },
        { id: 'u4-6', eng: 'See you later', es: 'Hasta luego' },
        { id: 'u4-7', eng: 'Good evening', es: 'Buenas noches' },
        { id: 'u4-8', eng: 'Good luck', es: 'Buena suerte' },
        { id: 'u4-9', eng: 'Congratulations', es: 'Felicidades' },
        { id: 'u4-10', eng: 'Have a nice day', es: 'Que tengas un buen día' },
        { id: 'u4-11', eng: 'Welcome', es: 'Bienvenido/Bienvenida' },
        { id: 'u4-12', eng: 'What happened?', es: '¿Qué pasó?' },
        { id: 'u4-13', eng: 'I love it', es: 'Me encanta' },
        { id: 'u4-14', eng: "It's okay", es: 'Está bien' },
        { id: 'u4-15', eng: "It doesn’t matter", es: 'No importa' },
        { id: 'u4-16', eng: 'I agree', es: 'Estoy de acuerdo' },
        { id: 'u4-17', eng: "I don't know", es: 'No sé' },
        { id: 'u4-18', eng: 'Excuse me', es: 'Perdón / Disculpa' },
        { id: 'u4-19', eng: 'Bless you', es: 'Salud' },
        { id: 'u4-20', eng: 'Cheers', es: 'Salud (brindis)' },
      ],
    },
    {
      id: 5,
      name: 'Conversación cotidiana',
      lessons: [
        { id: 'u5-1', eng: 'Where is the bank?', es: '¿Dónde está el banco?' },
        { id: 'u5-2', eng: 'I would like to order', es: 'Me gustaría pedir' },
        { id: 'u5-3', eng: "I'm looking for ...", es: 'Estoy buscando ...' },
        { id: 'u5-4', eng: 'How do I get to ...?', es: '¿Cómo llego a ...?' },
        { id: 'u5-5', eng: 'Do you speak Spanish?', es: '¿Hablas español?' },
        { id: 'u5-6', eng: 'I want to buy ...', es: 'Quiero comprar ...' },
        { id: 'u5-7', eng: 'What time is it?', es: '¿Qué hora es?' },
        { id: 'u5-8', eng: "It's very expensive", es: 'Es muy caro' },
        { id: 'u5-9', eng: "I'm lost", es: 'Estoy perdido/perdida' },
        { id: 'u5-10', eng: "It's delicious", es: 'Está delicioso' },
        { id: 'u5-11', eng: 'The check, please', es: 'La cuenta, por favor' },
        { id: 'u5-12', eng: 'Can I help you?', es: '¿Puedo ayudarte?' },
        { id: 'u5-13', eng: 'Just a moment', es: 'Un momento' },
        { id: 'u5-14', eng: "I'm sorry to bother you", es: 'Perdón por molestarte' },
        { id: 'u5-15', eng: "I don’t have any cash", es: 'No tengo efectivo' },
        { id: 'u5-16', eng: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?' },
        { id: 'u5-17', eng: 'Can I try it on?', es: '¿Puedo probármelo?' },
        { id: 'u5-18', eng: 'Where can I find ...?', es: '¿Dónde puedo encontrar ...?' },
        { id: 'u5-19', eng: 'I have a reservation', es: 'Tengo una reserva' },
        { id: 'u5-20', eng: 'How long does it take?', es: '¿Cuánto tiempo tarda?' },
      ],
    },
  ];
  // -------------------------------------------------------------------------
  // Extended curriculum
  //
  // The initial units above introduce core vocabulary and basic conversations.
  // To reach the target of 300–400 high‑frequency words and richer language
  // practice, we provide additional units below. These units cover reading and
  // writing, intermediate grammar, pronunciation drills, cultural idioms,
  // conversational fluency, practical English for travel/work, and a final
  // review unit. Each unit contains 30 items with English phrases and
  // their Spanish translations. We push these units into the existing
  // `units` array so they are treated exactly the same as the core units.
  // -------------------------------------------------------------------------
  const moreUnits = [
    {
      id: 6,
      name: 'Lectura y escritura',
      lessons: [
        { id: 'u6-1', eng: 'Book', es: 'Libro' },
        { id: 'u6-2', eng: 'Pen', es: 'Pluma' },
        { id: 'u6-3', eng: 'Notebook', es: 'Cuaderno' },
        { id: 'u6-4', eng: 'Paper', es: 'Papel' },
        { id: 'u6-5', eng: 'Sentence', es: 'Oración' },
        { id: 'u6-6', eng: 'Word', es: 'Palabra' },
        { id: 'u6-7', eng: 'Letter', es: 'Letra' },
        { id: 'u6-8', eng: 'Paragraph', es: 'Párrafo' },
        { id: 'u6-9', eng: 'Read', es: 'Leer' },
        { id: 'u6-10', eng: 'Write', es: 'Escribir' },
        { id: 'u6-11', eng: 'Spell', es: 'Deletrear' },
        { id: 'u6-12', eng: 'Question', es: 'Pregunta' },
        { id: 'u6-13', eng: 'Answer', es: 'Respuesta' },
        { id: 'u6-14', eng: 'Story', es: 'Historia' },
        { id: 'u6-15', eng: 'Dictionary', es: 'Diccionario' },
        { id: 'u6-16', eng: 'Pencil', es: 'Lápiz' },
        { id: 'u6-17', eng: 'Page', es: 'Página' },
        { id: 'u6-18', eng: 'Title', es: 'Título' },
        { id: 'u6-19', eng: 'Author', es: 'Autor' },
        { id: 'u6-20', eng: 'Main idea', es: 'Idea principal' },
        { id: 'u6-21', eng: 'Summary', es: 'Resumen' },
        { id: 'u6-22', eng: 'Title case', es: 'Mayúsculas y minúsculas' },
        { id: 'u6-23', eng: 'Verb', es: 'Verbo' },
        { id: 'u6-24', eng: 'Noun', es: 'Sustantivo' },
        { id: 'u6-25', eng: 'Adjective', es: 'Adjetivo' },
        { id: 'u6-26', eng: 'Subject', es: 'Sujeto' },
        { id: 'u6-27', eng: 'Object', es: 'Objeto' },
        { id: 'u6-28', eng: 'Write your name', es: 'Escribe tu nombre' },
        { id: 'u6-29', eng: 'Read aloud', es: 'Lee en voz alta' },
        { id: 'u6-30', eng: 'Sign here', es: 'Firma aquí' },
      ],
    },
    {
      id: 7,
      name: 'Gramática intermedia',
      lessons: [
        { id: 'u7-1', eng: 'Past tense', es: 'Pasado' },
        { id: 'u7-2', eng: 'Future tense', es: 'Futuro' },
        { id: 'u7-3', eng: 'I went', es: 'Yo fui' },
        { id: 'u7-4', eng: 'You went', es: 'Tú fuiste' },
        { id: 'u7-5', eng: 'He went', es: 'Él fue' },
        { id: 'u7-6', eng: 'We went', es: 'Nosotros fuimos' },
        { id: 'u7-7', eng: 'They went', es: 'Ellos fueron' },
        { id: 'u7-8', eng: 'Will go', es: 'Iré / Irá / Iremos' },
        { id: 'u7-9', eng: 'Should', es: 'Debería' },
        { id: 'u7-10', eng: 'Could', es: 'Podría' },
        { id: 'u7-11', eng: 'Would', es: 'Me gustaría / Haría' },
        { id: 'u7-12', eng: 'Must', es: 'Debes' },
        { id: 'u7-13', eng: 'Can', es: 'Puedes' },
        { id: 'u7-14', eng: 'There is', es: 'Hay (singular)' },
        { id: 'u7-15', eng: 'There are', es: 'Hay (plural)' },
        { id: 'u7-16', eng: 'Because', es: 'Porque' },
        { id: 'u7-17', eng: 'If', es: 'Si' },
        { id: 'u7-18', eng: 'When', es: 'Cuando' },
        { id: 'u7-19', eng: 'Before', es: 'Antes de' },
        { id: 'u7-20', eng: 'After', es: 'Después de' },
        { id: 'u7-21', eng: 'Never', es: 'Nunca' },
        { id: 'u7-22', eng: 'Always', es: 'Siempre' },
        { id: 'u7-23', eng: 'Sometimes', es: 'A veces' },
        { id: 'u7-24', eng: 'Often', es: 'A menudo' },
        { id: 'u7-25', eng: 'Rarely', es: 'Raramente' },
        { id: 'u7-26', eng: 'First', es: 'Primero' },
        { id: 'u7-27', eng: 'Then', es: 'Luego' },
        { id: 'u7-28', eng: 'Finally', es: 'Finalmente' },
        { id: 'u7-29', eng: 'I used to', es: 'Solía' },
        { id: 'u7-30', eng: 'I have to', es: 'Tengo que' },
      ],
    },
    {
      id: 8,
      name: 'Pronunciación y acento',
      lessons: [
        { id: 'u8-1', eng: 'Bat', es: 'Murciélago' },
        { id: 'u8-2', eng: 'Bet', es: 'Apuesta' },
        { id: 'u8-3', eng: 'Bit', es: 'Poco' },
        { id: 'u8-4', eng: 'Bought', es: 'Compró' },
        { id: 'u8-5', eng: 'Boot', es: 'Bota' },
        { id: 'u8-6', eng: 'Pot', es: 'Olla' },
        { id: 'u8-7', eng: 'Pet', es: 'Mascota' },
        { id: 'u8-8', eng: 'Pit', es: 'Foso' },
        { id: 'u8-9', eng: 'Pat', es: 'Palmadita' },
        { id: 'u8-10', eng: 'Ship', es: 'Barco' },
        { id: 'u8-11', eng: 'Sheep', es: 'Oveja' },
        { id: 'u8-12', eng: 'Beach', es: 'Playa' },
        { id: 'u8-13', eng: 'Pitch', es: 'Tono' },
        { id: 'u8-14', eng: 'Live', es: 'Vivir' },
        { id: 'u8-15', eng: 'Leave', es: 'Salir / Dejar' },
        { id: 'u8-16', eng: 'Full', es: 'Lleno' },
        { id: 'u8-17', eng: 'Fool', es: 'Tonto' },
        { id: 'u8-18', eng: 'Three', es: 'Tres' },
        { id: 'u8-19', eng: 'Tree', es: 'Árbol' },
        { id: 'u8-20', eng: 'Very', es: 'Muy' },
        { id: 'u8-21', eng: 'Berry', es: 'Baya' },
        { id: 'u8-22', eng: 'Walk', es: 'Caminar' },
        { id: 'u8-23', eng: 'Work', es: 'Trabajar' },
        { id: 'u8-24', eng: 'Focus', es: 'Enfocar' },
        { id: 'u8-25', eng: 'Fox', es: 'Zorro' },
        { id: 'u8-26', eng: 'Cat', es: 'Gato' },
        { id: 'u8-27', eng: 'Cut', es: 'Cortar' },
        { id: 'u8-28', eng: 'Caught', es: 'Atrapó' },
        { id: 'u8-29', eng: 'Seat', es: 'Asiento' },
        { id: 'u8-30', eng: 'Sit', es: 'Sentarse' },
      ],
    },
    {
      id: 9,
      name: 'Contextos culturales e idiomáticos',
      lessons: [
        { id: 'u9-1', eng: 'Break a leg', es: 'Mucha suerte' },
        { id: 'u9-2', eng: 'Piece of cake', es: 'Pan comido' },
        { id: 'u9-3', eng: 'Spill the beans', es: 'Revelar un secreto' },
        { id: 'u9-4', eng: 'Once in a blue moon', es: 'De vez en cuando' },
        { id: 'u9-5', eng: 'It’s raining cats and dogs', es: 'Está lloviendo a cántaros' },
        { id: 'u9-6', eng: 'Call it a day', es: 'Dar por terminado' },
        { id: 'u9-7', eng: 'Hit the sack', es: 'Ir a la cama' },
        { id: 'u9-8', eng: 'Costs an arm and a leg', es: 'Cuesta un ojo de la cara' },
        { id: 'u9-9', eng: 'Bite the bullet', es: 'Hacer de tripas corazón' },
        { id: 'u9-10', eng: 'Kick the bucket', es: 'Estirar la pata' },
        { id: 'u9-11', eng: 'Under the weather', es: 'Indispuesto' },
        { id: 'u9-12', eng: 'Best of both worlds', es: 'Lo mejor de ambos mundos' },
        { id: 'u9-13', eng: "Don't judge a book by its cover", es: 'No juzgues un libro por su portada' },
        { id: 'u9-14', eng: "Pull someone's leg", es: 'Tomar el pelo' },
        { id: 'u9-15', eng: 'Speak of the devil', es: 'Hablando del rey de Roma' },
        { id: 'u9-16', eng: 'The last straw', es: 'La gota que colmó el vaso' },
        { id: 'u9-17', eng: 'Time flies', es: 'El tiempo vuela' },
        { id: 'u9-18', eng: 'Burn the midnight oil', es: 'Quemarse las pestañas' },
        { id: 'u9-19', eng: 'Barking up the wrong tree', es: 'Ir por el camino equivocado' },
        { id: 'u9-20', eng: 'Hit the nail on the head', es: 'Dar en el clavo' },
        { id: 'u9-21', eng: 'Understood', es: 'Entendido' },
        { id: 'u9-22', eng: 'Culture shock', es: 'Choque cultural' },
        { id: 'u9-23', eng: 'When in Rome, do as the Romans do', es: 'Allá donde fueres, haz lo que vieres' },
        { id: 'u9-24', eng: 'Make yourself at home', es: 'Siéntete como en casa' },
        { id: 'u9-25', eng: 'Long time no see', es: 'Cuánto tiempo sin verte' },
        { id: 'u9-26', eng: "What's up?", es: '¿Qué pasa?' },
        { id: 'u9-27', eng: 'Cheers!', es: '¡Salud!' },
        { id: 'u9-28', eng: 'Keep in touch', es: 'Mantente en contacto' },
        { id: 'u9-29', eng: 'Safe travels', es: 'Buen viaje' },
        { id: 'u9-30', eng: 'Have a good one', es: 'Que te vaya bien' },
      ],
    },
    {
      id: 10,
      name: 'Fluidez conversacional',
      lessons: [
        { id: 'u10-1', eng: 'What do you think?', es: '¿Qué piensas?' },
        { id: 'u10-2', eng: 'In my opinion', es: 'En mi opinión' },
        { id: 'u10-3', eng: 'I agree with you', es: 'Estoy de acuerdo contigo' },
        { id: 'u10-4', eng: "I don't agree", es: 'No estoy de acuerdo' },
        { id: 'u10-5', eng: 'Could you explain?', es: '¿Podrías explicar?' },
        { id: 'u10-6', eng: 'Can you give me an example?', es: '¿Puedes darme un ejemplo?' },
        { id: 'u10-7', eng: "That's interesting", es: 'Eso es interesante' },
        { id: 'u10-8', eng: "I'm not sure", es: 'No estoy seguro' },
        { id: 'u10-9', eng: 'Let me think', es: 'Déjame pensar' },
        { id: 'u10-10', eng: 'That depends', es: 'Eso depende' },
        { id: 'u10-11', eng: 'How do you feel about ...?', es: '¿Cómo te sientes acerca de ...?' },
        { id: 'u10-12', eng: 'What would you do?', es: '¿Qué harías?' },
        { id: 'u10-13', eng: 'I would prefer', es: 'Preferiría' },
        { id: 'u10-14', eng: 'What do you mean?', es: '¿Qué quieres decir?' },
        { id: 'u10-15', eng: 'To be honest', es: 'Para ser honesto' },
        { id: 'u10-16', eng: 'By the way', es: 'Por cierto' },
        { id: 'u10-17', eng: 'As I was saying', es: 'Como estaba diciendo' },
        { id: 'u10-18', eng: "Let's move on", es: 'Pasemos a otra cosa' },
        { id: 'u10-19', eng: 'I have a question', es: 'Tengo una pregunta' },
        { id: 'u10-20', eng: 'Can you repeat that?', es: '¿Puedes repetir eso?' },
        { id: 'u10-21', eng: 'Sounds good', es: 'Suena bien' },
        { id: 'u10-22', eng: 'That makes sense', es: 'Tiene sentido' },
        { id: 'u10-23', eng: 'No problem', es: 'No hay problema' },
        { id: 'u10-24', eng: 'Take your time', es: 'Tómate tu tiempo' },
        { id: 'u10-25', eng: "I'm ready", es: 'Estoy listo' },
        { id: 'u10-26', eng: 'Are you ready?', es: '¿Estás listo?' },
        { id: 'u10-27', eng: 'How do you say ... in English?', es: '¿Cómo se dice ... en inglés?' },
        { id: 'u10-28', eng: 'What does ... mean?', es: '¿Qué significa ...?' },
        { id: 'u10-29', eng: 'Could you speak slower?', es: '¿Podrías hablar más despacio?' },
        { id: 'u10-30', eng: "Let's practice together", es: 'Practiquemos juntos' },
      ],
    },
    {
      id: 11,
      name: 'Inglés práctico para viajes y trabajo',
      lessons: [
        { id: 'u11-1', eng: 'Where is the hotel?', es: '¿Dónde está el hotel?' },
        { id: 'u11-2', eng: 'I have a reservation', es: 'Tengo una reserva' },
        { id: 'u11-3', eng: 'What time is check‑in?', es: '¿A qué hora es el registro?' },
        { id: 'u11-4', eng: "I'd like to check out", es: 'Me gustaría hacer el check‑out' },
        { id: 'u11-5', eng: 'Can I see the menu?', es: '¿Puedo ver el menú?' },
        { id: 'u11-6', eng: 'Can I have the bill?', es: '¿Me trae la cuenta?' },
        { id: 'u11-7', eng: 'Where is the nearest bus stop?', es: '¿Dónde está la parada de autobús más cercana?' },
        { id: 'u11-8', eng: 'How much is a ticket to ...?', es: '¿Cuánto cuesta un billete a ...?' },
        { id: 'u11-9', eng: "I'm here on business", es: 'Estoy aquí por negocios' },
        { id: 'u11-10', eng: "I'm here on vacation", es: 'Estoy aquí de vacaciones' },
        { id: 'u11-11', eng: 'Do you have any job openings?', es: '¿Tienen vacantes?' },
        { id: 'u11-12', eng: 'I would like to apply for a job', es: 'Me gustaría solicitar un trabajo' },
        { id: 'u11-13', eng: 'Could you please send me the report?', es: '¿Podrías enviarme el informe?' },
        { id: 'u11-14', eng: "Let's schedule a meeting", es: 'Programemos una reunión' },
        { id: 'u11-15', eng: 'I will be late', es: 'Llegaré tarde' },
        { id: 'u11-16', eng: 'Where is the conference room?', es: '¿Dónde está la sala de conferencias?' },
        { id: 'u11-17', eng: 'Please fill out this form', es: 'Por favor llena este formulario' },
        { id: 'u11-18', eng: 'What are the business hours?', es: '¿Cuáles son los horarios de atención?' },
        { id: 'u11-19', eng: 'Do you accept US dollars?', es: '¿Aceptan dólares estadounidenses?' },
        { id: 'u11-20', eng: 'I need a taxi to the airport', es: 'Necesito un taxi al aeropuerto' },
        { id: 'u11-21', eng: 'How long is the flight?', es: '¿Cuánto dura el vuelo?' },
        { id: 'u11-22', eng: 'Is there Wi‑Fi available?', es: '¿Hay Wi‑Fi disponible?' },
        { id: 'u11-23', eng: 'Where is the restroom?', es: '¿Dónde está el baño?' },
        { id: 'u11-24', eng: 'What time does the train leave?', es: '¿A qué hora sale el tren?' },
        { id: 'u11-25', eng: 'Can I have a window seat?', es: '¿Puedo tener un asiento de ventanilla?' },
        { id: 'u11-26', eng: 'I need help with my luggage', es: 'Necesito ayuda con mi equipaje' },
        { id: 'u11-27', eng: 'I have an appointment with ...', es: 'Tengo una cita con ...' },
        { id: 'u11-28', eng: 'Could you guide me to ...?', es: '¿Podrías guiarme a ...?' },
        { id: 'u11-29', eng: 'Where can I rent a car?', es: '¿Dónde puedo alquilar un coche?' },
        { id: 'u11-30', eng: 'Please speak English', es: 'Por favor hable en inglés' },
      ],
    },
    {
      id: 12,
      name: 'Revisión y maestría',
      lessons: [
        { id: 'u12-1', eng: "It's up to you", es: 'Depende de ti' },
        { id: 'u12-2', eng: "Don't mention it", es: 'No hay de qué' },
        { id: 'u12-3', eng: "I'll be right back", es: 'Regreso enseguida' },
        { id: 'u12-4', eng: 'Take care', es: 'Cuídate' },
        { id: 'u12-5', eng: "I'm looking forward to it", es: 'Lo espero con ansias' },
        { id: 'u12-6', eng: 'Thanks for your help', es: 'Gracias por tu ayuda' },
        { id: 'u12-7', eng: 'Could you show me?', es: '¿Me podría mostrar?' },
        { id: 'u12-8', eng: 'I appreciate it', es: 'Lo aprecio' },
        { id: 'u12-9', eng: 'What do you recommend?', es: '¿Qué recomiendas?' },
        { id: 'u12-10', eng: "I'm proud of you", es: 'Estoy orgulloso de ti' },
        { id: 'u12-11', eng: 'Excuse me, I’m sorry', es: 'Perdón, lo siento' },
        { id: 'u12-12', eng: "I don't remember", es: 'No recuerdo' },
        { id: 'u12-13', eng: 'I changed my mind', es: 'Cambié de opinión' },
        { id: 'u12-14', eng: "I'm learning English", es: 'Estoy aprendiendo inglés' },
        { id: 'u12-15', eng: 'Can you write it down?', es: '¿Puedes escribirlo?' },
        { id: 'u12-16', eng: 'What time should we meet?', es: '¿A qué hora nos reunimos?' },
        { id: 'u12-17', eng: 'Have you been here before?', es: '¿Has estado aquí antes?' },
        { id: 'u12-18', eng: 'Can I ask you a favor?', es: '¿Puedo pedirte un favor?' },
        { id: 'u12-19', eng: 'See you tomorrow', es: 'Nos vemos mañana' },
        { id: 'u12-20', eng: "Let's keep in touch", es: 'Mantengámonos en contacto' },
        { id: 'u12-21', eng: "You're welcome", es: 'De nada' },
        { id: 'u12-22', eng: 'Have a nice weekend', es: 'Que tengas un buen fin de semana' },
        { id: 'u12-23', eng: "I'm just kidding", es: 'Solo estoy bromeando' },
        { id: 'u12-24', eng: "That's fine with me", es: 'Eso está bien para mí' },
        { id: 'u12-25', eng: 'It was nice talking to you', es: 'Fue agradable hablar contigo' },
        { id: 'u12-26', eng: 'Please wait a moment', es: 'Por favor espera un momento' },
        { id: 'u12-27', eng: "I'm sorry I'm late", es: 'Siento llegar tarde' },
        { id: 'u12-28', eng: 'Congratulations on your success', es: 'Felicidades por tu éxito' },
        { id: 'u12-29', eng: 'Could you explain it again?', es: '¿Puedes explicarlo otra vez?' },
        { id: 'u12-30', eng: 'Thank you for your patience', es: 'Gracias por tu paciencia' },
      ],
    },
  ];
  units.push(...moreUnits);

  // ---------------------------------------------------------------------------
  // State persistence helpers
  //
  // The configuration (daily goal) and learner progress (points, streak,
  // flashcards) are stored in localStorage. This ensures the app remains
  // responsive and functional without requiring a network connection or
  // external services. JSON parse and stringify are wrapped in try/catch
  // blocks to avoid corrupting the state on malformed input.
  // ---------------------------------------------------------------------------
  const STORAGE_KEYS = {
    config: 'englishConfig',
    progress: 'englishProgress',
  };

  function loadFromStorage(key, fallback = null) {
    try {
      const json = localStorage.getItem(key);
      return json ? JSON.parse(json) : fallback;
    } catch (err) {
      console.error('Error reading from localStorage', err);
      return fallback;
    }
  }

  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error writing to localStorage', err);
    }
  }

  // Default progress structure. Points and streak counters start at zero. The
  // flashcards object is empty until the learner studies a phrase. Each key
  // within flashcards will store an object with scheduling data.
  const defaultProgress = {
    points: 0,
    streak: 0,
    lastSessionDate: null,
    flashcards: {},
    badges: [],
  };

  // In-memory state object. Configuration and progress are loaded from
  // localStorage on startup and mutated throughout the session. Changes are
  // persisted back to localStorage when necessary.
  const state = {
    config: null,
    progress: null,
    currentUnit: null,
    currentLessonIndex: 0,
    currentFlashcard: null,
    quiz: null,
  };

  // ---------------------------------------------------------------------------
  // DOM helpers
  //
  // Simple query helper to reduce verbosity. $ returns the first element
  // matching the selector. $all returns all matching elements.
  // ---------------------------------------------------------------------------
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  function showScreen(id) {
    $$('.screen').forEach((el) => el.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) screen.classList.add('active');
  }

  // Helper to speak a phrase using the browser's built-in SpeechSynthesis API.
  function speakPhrase(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }

  // Get today's date string in YYYY-MM-DD format. Used for streak tracking.
  function getToday() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  // Update the streak counter based on the last session date. If the learner
  // studied yesterday, increment the streak. If the gap is more than one day,
  // reset the streak. Called when the app loads and when a session finishes.
  function updateStreak() {
    const today = getToday();
    const last = state.progress.lastSessionDate;
    if (!last) {
      // first session
      state.progress.streak = 1;
    } else {
      const lastDate = new Date(last);
      const todayDate = new Date(today);
      const diff = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
      if (diff === 0) {
        // already counted today
        return;
      }
      if (diff === 1) {
        state.progress.streak += 1;
      } else if (diff > 1) {
        state.progress.streak = 1;
      }
    }
    state.progress.lastSessionDate = today;
    saveToStorage(STORAGE_KEYS.progress, state.progress);
  }

  // Award badges based on milestones. Badges are identified by a string and
  // stored in the progress.badges array. When a badge is awarded we push it
  // into the array and persist to storage. This function is called each time
  // the user finishes a flashcard session or completes a streak. You can
  // expand this list with additional achievements.
  function awardBadges() {
    const p = state.progress;
    // First lesson badge
    if (p.points >= 10 && !p.badges.includes('first-steps')) {
      p.badges.push('first-steps');
      alert('¡Felicidades! Has obtenido la insignia: Primeros pasos');
    }
    // 7-day streak badge
    if (p.streak >= 7 && !p.badges.includes('week-streak')) {
      p.badges.push('week-streak');
      alert('¡Genial! Has completado una racha de 7 días');
    }
    // 100 words mastered badge
    const masteredCount = Object.values(p.flashcards).filter(
      (card) => card.interval >= 7
    ).length;
    if (masteredCount >= 100 && !p.badges.includes('hundred-words')) {
      p.badges.push('hundred-words');
      alert('¡Increíble! Has dominado 100 palabras/expresiones');
    }
    saveToStorage(STORAGE_KEYS.progress, p);
  }

  // Create and display the daily plan cards on the home screen. Each plan
  // corresponds to one of the core activities: listening practice, flashcards
  // and a short quiz. Clicking a card triggers the associated view.
  function buildDailyPlan() {
    const container = $('#daily-plan');
    container.innerHTML = '';

    const plans = [
      {
        id: 'listen',
        title: 'Escuchar y repetir',
        description: 'Practica frases clave con audio y repite',
        duration: 4,
      },
      {
        id: 'flashcards',
        title: 'Tarjetas',
        description: 'Repasa vocabulario con repetición espaciada',
        duration: 4,
      },
      {
        id: 'quiz',
        title: 'Quiz rápido',
        description: 'Responde un breve cuestionario',
        duration: 2,
      },
    ];

    plans.forEach((plan) => {
      const card = document.createElement('div');
      card.className = 'unit-card';
      card.innerHTML = `<h3>${plan.title}</h3><p>${plan.description}</p><p><strong>${plan.duration} min</strong></p>`;
      card.addEventListener('click', () => {
        if (plan.id === 'listen') {
          startListeningPractice();
        } else if (plan.id === 'flashcards') {
          startFlashcards();
        } else if (plan.id === 'quiz') {
          startQuiz();
        }
      });
      container.appendChild(card);
    });
  }

  // Render the list of units with progress bars. Clicking a unit card opens
  // listening practice for that unit starting from the first unfinished lesson.
  function buildUnitsList() {
    const container = $('#units-list');
    container.innerHTML = '';
    units.forEach((unit) => {
      const card = document.createElement('div');
      card.className = 'unit-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.innerHTML = `<h3>${unit.name}</h3><div class="progress-bar"><div class="fill"></div></div>`;
      // Compute progress per unit: percentage of lessons that have been
      // scheduled at least once in flashcards
      const total = unit.lessons.length;
      let completed = 0;
      unit.lessons.forEach((lesson) => {
        const fc = state.progress.flashcards[lesson.id];
        if (fc && fc.interval >= 1) completed++;
      });
      const percent = Math.round((completed / total) * 100);
      card.querySelector('.fill').style.width = percent + '%';
      card.addEventListener('click', () => {
        state.currentUnit = unit.id;
        state.currentLessonIndex = 0;
        startListeningPractice(unit.id);
      });
      container.appendChild(card);
    });
  }

  // Show greeting and streak info on home screen
  function updateHomeHeader() {
    const greet = $('#home-greeting');
    const streakEl = $('#streak-container');
    greet.textContent = `¡Hola, Adriana!`;
    const streak = state.progress.streak;
    if (streak > 1) {
      streakEl.textContent = `Racha de ${streak} días`;
    } else {
      streakEl.textContent = '';
    }
  }

  // ---------------------------------------------------------------------------
  // Listening Practice
  //
  // The listening practice shows a phrase from the selected unit. It speaks
  // the English text aloud and encourages the learner to repeat. The user
  // can navigate through phrases using Next and Prev buttons. Completing
  // listening practice gives a small points boost. If called without a unit
  // id, the first unit is selected by default.
  // ---------------------------------------------------------------------------
  function startListeningPractice(unitId = null) {
    // Default to the next unit not yet completed
    let unit;
    if (unitId) {
      unit = units.find((u) => u.id === unitId);
    } else {
      unit = units[0];
    }
    state.currentUnit = unit.id;
    showScreen('lesson-screen');
    renderLesson();
  }

  // Render the current phrase within the selected unit. Provides Play audio
  // capability and navigation controls. When reaching the end of the unit
  // the function loops back to the beginning.
  function renderLesson() {
    const unit = units.find((u) => u.id === state.currentUnit);
    const lesson = unit.lessons[state.currentLessonIndex];
    $('#lesson-title').textContent = unit.name;
    $('#lesson-subtitle').textContent = `${state.currentLessonIndex + 1} / ${unit.lessons.length}`;
    const content = $('#lesson-content');
    content.innerHTML = '';
    const phraseEl = document.createElement('div');
    phraseEl.className = 'phrase';
    phraseEl.textContent = lesson.eng;
    const translationEl = document.createElement('div');
    translationEl.className = 'translation';
    translationEl.textContent = lesson.es;
    content.appendChild(phraseEl);
    content.appendChild(translationEl);
    // Controls
    const controls = $('#lesson-controls');
    controls.innerHTML = '';
    const playBtn = document.createElement('button');
    playBtn.className = 'primary';
    playBtn.textContent = 'Escuchar';
    playBtn.addEventListener('click', () => {
      speakPhrase(lesson.eng);
    });
    const prevBtn = document.createElement('button');
    prevBtn.className = 'secondary';
    prevBtn.textContent = 'Anterior';
    prevBtn.disabled = state.currentLessonIndex === 0;
    prevBtn.addEventListener('click', () => {
      if (state.currentLessonIndex > 0) {
        state.currentLessonIndex--;
        renderLesson();
      }
    });
    const nextBtn = document.createElement('button');
    nextBtn.className = 'secondary';
    nextBtn.textContent = 'Siguiente';
    nextBtn.addEventListener('click', () => {
      if (state.currentLessonIndex < unit.lessons.length - 1) {
        state.currentLessonIndex++;
      } else {
        state.currentLessonIndex = 0;
      }
      renderLesson();
    });
    controls.appendChild(playBtn);
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    // Award points when the user listens to the phrase for the first time
    if (!state.progress.flashcards[lesson.id]) {
      state.progress.points += 1;
      saveToStorage(STORAGE_KEYS.progress, state.progress);
    }
  }

  // ---------------------------------------------------------------------------
  // Flashcards (Spaced repetition)
  //
  // Uses a simple scheduling algorithm. Each card has an interval and due
  // date. New cards start with interval = 1 day. On rating, the interval
  // increases (easy -> +4 days, medio -> +2 days, de nuevo -> reset to 1 day).
  // The next due date is calculated from the current date. Cards are stored
  // in the progress.flashcards map.
  // ---------------------------------------------------------------------------
  function startFlashcards() {
    // Build a queue of due flashcards. If none are due, introduce new cards
    const due = [];
    const today = new Date().getTime();
    // Add existing due cards
    Object.keys(state.progress.flashcards).forEach((id) => {
      const card = state.progress.flashcards[id];
      if (card.dueDate <= today) {
        due.push({ id, ...card });
      }
    });
    // If there are no due cards, pick a few new lessons to introduce
    if (due.length === 0) {
      // gather all lesson ids already in flashcards
      const learntIds = new Set(Object.keys(state.progress.flashcards));
      const newCards = [];
      units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          if (!learntIds.has(lesson.id)) {
            newCards.push(lesson);
          }
        });
      });
      // Limit to 5 new cards at a time
      due.push(
        ...newCards.slice(0, 5).map((lesson) => ({
          id: lesson.id,
          eng: lesson.eng,
          es: lesson.es,
          interval: 0,
          dueDate: today,
        }))
      );
    }
    if (due.length === 0) {
      alert('¡No hay tarjetas pendientes por ahora!');
      return;
    }
    // Save due queue in state
    state.currentFlashcard = {
      queue: due,
      index: 0,
    };
    showScreen('flashcards-screen');
    renderFlashcard();
  }

  function renderFlashcard() {
    const fc = state.currentFlashcard;
    const cardData = fc.queue[fc.index];
    const lesson = findLessonById(cardData.id);
    const container = $('#flashcard-content');
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'flashcard';
    // front/back toggling
    let showingFront = true;
    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = lesson.eng;
    const back = document.createElement('div');
    back.className = 'back hidden';
    back.textContent = lesson.es;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', () => {
      showingFront = !showingFront;
      if (showingFront) {
        front.classList.remove('hidden');
        back.classList.add('hidden');
      } else {
        front.classList.add('hidden');
        back.classList.remove('hidden');
      }
    });
    container.appendChild(card);
    // Rating buttons
    const buttonsContainer = $('#flashcard-buttons');
    buttonsContainer.innerHTML = '';
    const againBtn = document.createElement('button');
    againBtn.className = 'primary';
    againBtn.textContent = 'De nuevo';
    const medioBtn = document.createElement('button');
    medioBtn.className = 'primary';
    medioBtn.textContent = 'Medio';
    const easyBtn = document.createElement('button');
    easyBtn.className = 'primary';
    easyBtn.textContent = 'Fácil';
    buttonsContainer.appendChild(againBtn);
    buttonsContainer.appendChild(medioBtn);
    buttonsContainer.appendChild(easyBtn);
    // Handler for rating
    function rateCard(multiplier) {
      // multiplier: 1 for again, 2 for medio, 4 for easy
      const todayDate = new Date();
      const progressCard = state.progress.flashcards[cardData.id] || {
        interval: 0,
        dueDate: todayDate.getTime(),
      };
      // Increase interval accordingly
      const newInterval = Math.max(1, progressCard.interval * multiplier);
      progressCard.interval = newInterval;
      // Due date after interval days
      const dueDate = new Date(todayDate.getTime());
      dueDate.setDate(todayDate.getDate() + newInterval);
      progressCard.dueDate = dueDate.getTime();
      state.progress.flashcards[cardData.id] = progressCard;
      state.progress.points += multiplier; // award more points for harder ratings
      saveToStorage(STORAGE_KEYS.progress, state.progress);
      // Move to next card
      if (fc.index < fc.queue.length - 1) {
        fc.index += 1;
        renderFlashcard();
      } else {
        alert('¡Sesión de tarjetas completada!');
        awardBadges();
        showHome();
      }
    }
    againBtn.addEventListener('click', () => rateCard(1));
    medioBtn.addEventListener('click', () => rateCard(2));
    easyBtn.addEventListener('click', () => rateCard(4));
  }

  // Helper to find a lesson across all units by id
  function findLessonById(id) {
    for (const unit of units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === id) return lesson;
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Quiz
  //
  // Builds a quiz of 5 multiple‑choice questions from across all units. Each
  // question shows an English phrase and offers four Spanish translations
  // (one correct and three incorrect). Points are awarded for correct
  // answers. The quiz ends after five questions and returns to the home
  // screen.
  // ---------------------------------------------------------------------------
  function startQuiz() {
    // Prepare question pool
    const allLessons = [];
    units.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        allLessons.push(lesson);
      });
    });
    const questions = [];
    // Randomly choose 5 distinct lessons
    const pool = [...allLessons];
    for (let i = 0; i < 5 && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      const lesson = pool.splice(idx, 1)[0];
      // Build options: one correct and three incorrect translations
      const options = [lesson.es];
      while (options.length < 4) {
        const rand = allLessons[Math.floor(Math.random() * allLessons.length)].es;
        if (!options.includes(rand)) options.push(rand);
      }
      shuffleArray(options);
      questions.push({
        eng: lesson.eng,
        correct: lesson.es,
        options,
      });
    }
    state.quiz = { questions, index: 0, score: 0 };
    showScreen('quiz-screen');
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = state.quiz.questions[state.quiz.index];
    const container = $('#quiz-content');
    container.innerHTML = '';
    const questionEl = document.createElement('div');
    questionEl.className = 'quiz-question';
    questionEl.textContent = q.eng;
    container.appendChild(questionEl);
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'primary';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (opt === q.correct) {
          state.quiz.score += 1;
          state.progress.points += 2;
        }
        if (state.quiz.index < state.quiz.questions.length - 1) {
          state.quiz.index++;
          renderQuizQuestion();
        } else {
          finishQuiz();
        }
      });
      optionsDiv.appendChild(btn);
    });
    container.appendChild(optionsDiv);
    // Progress indicator
    const progressEl = document.createElement('div');
    progressEl.className = 'quiz-result';
    progressEl.textContent = `Pregunta ${state.quiz.index + 1} de ${state.quiz.questions.length}`;
    container.appendChild(progressEl);
  }

  function finishQuiz() {
    const container = $('#quiz-content');
    container.innerHTML = '';
    const result = document.createElement('div');
    result.className = 'quiz-result';
    result.innerHTML = `¡Quiz completado!<br>Obtuviste ${state.quiz.score} de ${state.quiz.questions.length} respuestas correctas.`;
    container.appendChild(result);
    // Award points for completing the quiz
    state.progress.points += state.quiz.score;
    saveToStorage(STORAGE_KEYS.progress, state.progress);
    awardBadges();
    // After short delay, return to home
    setTimeout(() => {
      showHome();
    }, 3000);
  }

  // Fisher-Yates shuffle to randomise options
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // ---------------------------------------------------------------------------
  // Progress view
  //
  // Displays total points, streak, number of mastered words and badges earned.
  // ---------------------------------------------------------------------------
  function showProgress() {
    showScreen('progress-screen');
    const summary = $('#progress-summary');
    summary.innerHTML = '';
    const pointsEl = document.createElement('p');
    pointsEl.textContent = `Puntos: ${state.progress.points}`;
    const streakEl = document.createElement('p');
    streakEl.textContent = `Racha actual: ${state.progress.streak} días`;
    // Mastered words count: interval >= 7 days
    const masteredCount = Object.values(state.progress.flashcards).filter(
      (card) => card.interval >= 7
    ).length;
    const masteredEl = document.createElement('p');
    masteredEl.textContent = `Palabras dominadas: ${masteredCount}`;
    summary.appendChild(pointsEl);
    summary.appendChild(streakEl);
    summary.appendChild(masteredEl);
    // Badges
    if (state.progress.badges.length > 0) {
      const badgesHeading = document.createElement('p');
      badgesHeading.textContent = 'Insignias:';
      summary.appendChild(badgesHeading);
      state.progress.badges.forEach((badge) => {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'badge';
        if (badge === 'first-steps') badgeEl.textContent = 'Primeros pasos';
        else if (badge === 'week-streak') badgeEl.textContent = 'Racha de 7 días';
        else if (badge === 'hundred-words') badgeEl.textContent = '100 palabras';
        summary.appendChild(badgeEl);
      });
    }
  }

  // Return to home screen and refresh plan and header
  function showHome() {
    updateHomeHeader();
    buildDailyPlan();
    showScreen('home-screen');
  }

  // ---------------------------------------------------------------------------
  // Setup and configuration
  //
  // Handles initial setup when no configuration exists. The learner selects
  // a daily goal. Spanish hints are enabled by default. Once saved, the
  // configuration is persisted and the home screen is displayed.
  // ---------------------------------------------------------------------------
  function setup() {
    showScreen('setup-screen');
    // Handle goal selection highlighting
    $('#goal-options').addEventListener('click', (e) => {
      if (e.target.matches('button[data-goal]')) {
        $$('#goal-options button').forEach((btn) => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        state.config = {
          dailyGoal: parseInt(e.target.getAttribute('data-goal'), 10),
          spanishHints: true,
        };
      }
    });
    $('#setup-continue').addEventListener('click', () => {
      if (!state.config) {
        alert('Por favor selecciona una meta diaria.');
        return;
      }
      saveToStorage(STORAGE_KEYS.config, state.config);
      showHome();
    });
  }

  // Register service worker for offline support
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .catch((err) => console.error('SW registration failed', err));
    }
  }

  // Attach global event listeners for navigation buttons
  function attachGlobalListeners() {
    // Back buttons
    $('#lesson-back').addEventListener('click', () => showHome());
    $('#flashcards-back').addEventListener('click', () => showHome());
    $('#quiz-back').addEventListener('click', () => showHome());
    $('#progress-back').addEventListener('click', () => showHome());
    $('#units-back').addEventListener('click', () => showHome());
    // Home actions
    $('#home-units').addEventListener('click', () => {
      showScreen('units-screen');
      buildUnitsList();
    });
    $('#home-progress').addEventListener('click', () => {
      showProgress();
    });
  }

  // Initialise the application. Load configuration and progress from
  // localStorage, attach listeners and decide which screen to show.
  function init() {
    state.config = loadFromStorage(STORAGE_KEYS.config, null);
    state.progress = loadFromStorage(STORAGE_KEYS.progress, null) || { ...defaultProgress };
    attachGlobalListeners();
    registerServiceWorker();
    if (!state.config) {
      setup();
    } else {
      updateStreak();
      showHome();
    }
  }

  // Kick things off when DOM is ready
  document.addEventListener('DOMContentLoaded', init);
})();