export interface Question {
    id: number;
    title?: string;
    question: string;
    type: 'text' | 'radio' | 'textarea' | 'checkbox' | 'number';
    key: string;
    placeholder?: string;
    options?: string[];
  }
  export const questions: Question[] = [
        {
          id: 1,
          title:'Symptoms',
          question: 'How often do you forget recent conversations or events?',
          type: 'number',
          key: 'Forgetfulness',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 2,
          question: 'How often do you lose or misplace items?',
          type: 'number',
          key: 'Misplacing Items',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 3,
          question: 'How often do you have trouble remembering names of places or objects?',
          type: 'number',
          key: 'Name Recall',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 4,
          question: 'How often do you struggle to find the right word during conversation?',
          type: 'number',
          key: 'Word Finding',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 5,
          question: 'How often do you ask the same questions repeatedly?',
          type: 'number',
          key: 'Repetition',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 6,
          question: 'How often do you have difficulty making decisions or poor judgment?',
          type: 'number',
          key: 'Judgment & Decision-Making',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 7,
          question: 'How often do you feel less flexible and reluctant to try new things?',
          type: 'number',
          key: 'Adaptability',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 8,
          question: 'How often do you have trouble concentrating or focusing on tasks?',
          type: 'number',
          key: 'Concentration',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 9,
          question: 'How often do you struggle to plan or organize activities?',
          type: 'number',
          key: 'Planning & Organization',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 10,
          question: 'How often do you avoid or struggle with social interactions?',
          type: 'number',
          key: 'Social Interaction',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 11,
          question: 'How often do you have difficulty with basic motor tasks (e.g., walking, balance)?',
          type: 'number',
          key: 'Motor Skills',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 12,
          title:'Health and Lifestyle Factors',
          question: 'How often do you engage in physical exercise?',
          type: 'number',
          key: 'Physical Activity',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 13,
          question: 'How often do you experience disrupted or poor sleep?',
          type: 'number',
          key: 'Sleep Quality',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 14,
          question: 'How often do you eat a balanced, healthy diet?',
          type: 'number',
          key: 'Diet & Nutrition',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 15,
          question: 'How often do you feel stressed or overwhelmed?',
          type: 'number',
          key: 'Stress Levels',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 16,
          title:'Risk Factors',
          question: 'What is your age?',
          type: 'number', 
          key: 'Age',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 17,
          question: 'Is there a family history of dementia or Alzheimer’s?',
          type: 'radio',  // Assuming yes/no input
          options: ['yes', 'no'],
          key: 'Family History',
          placeholder:'Rate from 1 to 10'
        },
        {
          id: 18,
          question: 'Do you have any diagnosed neurological conditions?',
          type: 'text',  // Can also be 'boolean' or 'text' based on response format
          key: 'Neurological Conditions',
          placeholder:'Rate from 1 to 10'
        },
        // {
        //   id: 1,
        //   question: "What's your name?",
        //   type: 'text',
        //   key: 'name'
        // },
        // {
        //   id: 2,
        //   question: 'Gender',
        //   type: 'radio',
        //   options: ['Male', 'Female', 'Other'],
        //   key: 'gender'
        // },
        // {
        //   id: 3,
        //   question: 'Tell us about yourself',
        //   type: 'textarea',
        //   key: 'about'
        // },
        // {
        //   id: 4,
        //   question: 'What are your interests?',
        //   type: 'checkbox',
        //   options: ['Sports', 'Music', 'Art', 'Technology'],
        //   key: 'interests'
        // },
        // {
        //   id: 5,
        //   question: 'How old are you?',
        //   type: 'number',
        //   key: 'age'
        // }
      ];  