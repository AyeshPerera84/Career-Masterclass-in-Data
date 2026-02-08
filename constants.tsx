
import { Module } from './types';

export const MOTIVATIONAL_QUOTES = [
  { text: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina" },
  { text: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming" },
  { text: "Data is the new oil. It's valuable, but if unrefined it cannot really be used.", author: "Clive Humby" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "It is a capital mistake to theorize before one has data.", author: "Arthur Conan Doyle" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
  { text: "Information is the oil of the 21st century, and analytics is the combustion engine.", author: "Peter Sondergaard" },
  { text: "In God we trust, all others must bring data.", author: "W. Edwards Deming" },
  { text: "Knowledge is power. Information is liberating.", author: "Kofi Annan" }
];

export const COURSE_MODULES: Module[] = [
  // SECTION: ROADMAP
  {
    id: 'intro-roadmap',
    section: 'Roadmap',
    title: 'Introduction & Career Roadmap',
    description: 'The big picture of what it takes to become a professional data analyst.',
    content: `Start your journey here. We cover what a data analyst actually does and the path from zero to hired. This sets the stage for the technical skills you will learn throughout this masterclass.`,
    videoTimestamp: '00:00',
    points: 50,
    quiz: {
      question: "Which of the following is typically the first step in the Data Analyst roadmap?",
      options: ["Building a LinkedIn profile", "Learning core technical skills like SQL and Excel", "Applying for Senior roles", "Writing a master's thesis"],
      correctAnswer: 1,
      explanation: "Foundational skills are the bedrock of any data career."
    }
  },
  {
    id: 'part1-core-skills',
    section: 'Roadmap',
    title: 'Part 1: Core Data Analyst Skills',
    description: 'Deep dive into SQL, BI, Excel, Python, and Cloud.',
    content: `Understanding the tech stack: SQL for data retrieval, Excel for quick analysis, BI tools (Tableau/Power BI) for viz, and Python for advanced automation.`,
    videoTimestamp: '01:59',
    points: 50
  },
  {
    id: 'part2-projects',
    section: 'Roadmap',
    title: 'Part 2: Build Projects & Portfolio',
    description: 'Why projects are your most important asset.',
    content: `Learn why real-world projects are the only way to prove your value to employers before you have 'official' experience.`,
    videoTimestamp: '07:09',
    points: 50
  },
  {
    id: 'part3-resume',
    section: 'Roadmap',
    title: 'Part 3: Build a Data Analyst Resume',
    description: 'Formatting your resume for ATS and human eyes.',
    content: `Specific tips on how to highlight data projects on your resume even if your previous jobs weren't data-focused.`,
    videoTimestamp: '08:39',
    points: 50
  },
  {
    id: 'part4-apply',
    section: 'Roadmap',
    title: 'Part 4: Apply for Jobs (Recruiters)',
    description: 'Strategies for getting interviews.',
    content: `How to talk to recruiters and use LinkedIn to your advantage in the job hunt.`,
    videoTimestamp: '09:50',
    points: 50
  },
  {
    id: 'hired-timeline',
    section: 'Roadmap',
    title: 'Timeline: How Long It Takes to Get Hired',
    description: 'Managing expectations for your career pivot.',
    content: `A realistic breakdown of the 3-12 month journey depending on your starting point and daily commitment.`,
    videoTimestamp: '11:59',
    points: 50
  },

  // SECTION: SQL BASICS
  {
    id: 'sql-basics-create',
    section: 'SQL Basics',
    title: 'Creating Tables & Inserting Data',
    description: 'Fundamentals of DDL and DML.',
    content: `Learn how to define your database structure and populate it with data.`,
    videoTimestamp: '15:24',
    points: 100
  },
  {
    id: 'sql-basics-select',
    section: 'SQL Basics',
    title: 'SELECT & FROM Statements',
    description: 'Retrieving data.',
    content: `The primary building blocks of every SQL query.`,
    videoTimestamp: '24:43',
    points: 100
  },
  {
    id: 'sql-basics-where',
    section: 'SQL Basics',
    title: 'WHERE Statement',
    description: 'Filtering results.',
    content: `Using filters to isolate specific records.`,
    videoTimestamp: '31:01',
    points: 100
  },
  {
    id: 'sql-basics-groupby',
    section: 'SQL Basics',
    title: 'GROUP BY & ORDER BY',
    description: 'Aggregating and sorting.',
    content: `Learn how to summarize data and organize your output.`,
    videoTimestamp: '38:56',
    points: 100
  },

  // SECTION: INTERMEDIATE SQL
  {
    id: 'sql-int-joins',
    section: 'Intermediate SQL',
    title: 'JOINs (Inner, Outer, Left, Right, Full)',
    description: 'Combining data sources.',
    content: `Master the art of linking tables.`,
    videoTimestamp: '47:18',
    points: 150
  },
  {
    id: 'sql-int-unions',
    section: 'Intermediate SQL',
    title: 'UNIONs',
    description: 'Stacking datasets.',
    content: `Combining results vertically.`,
    videoTimestamp: '01:02:58',
    points: 150
  },
  {
    id: 'sql-int-case',
    section: 'Intermediate SQL',
    title: 'CASE Statements',
    description: 'Conditional logic.',
    content: `Creating categories and logic in SQL.`,
    videoTimestamp: '01:08:24',
    points: 150
  },
  {
    id: 'sql-int-having',
    section: 'Intermediate SQL',
    title: 'HAVING Clause',
    description: 'Filtering aggregates.',
    content: `Why HAVING is different from WHERE.`,
    videoTimestamp: '01:15:50',
    points: 150
  },
  {
    id: 'sql-int-update',
    section: 'Intermediate SQL',
    title: 'Updating and Deleting Data',
    description: 'Modifying records.',
    content: `Carefully changing data in your tables.`,
    videoTimestamp: '01:19:20',
    points: 150
  },
  {
    id: 'sql-int-alias',
    section: 'Intermediate SQL',
    title: 'Aliasing',
    description: 'Renaming for clarity.',
    content: `Using AS for columns and tables.`,
    videoTimestamp: '01:23:52',
    points: 150
  },
  {
    id: 'sql-int-partition',
    section: 'Intermediate SQL',
    title: 'PARTITION BY',
    description: 'Window functions.',
    content: `Calculating across row sets.`,
    videoTimestamp: '01:30:13',
    points: 200
  },

  // SECTION: ADVANCED SQL
  {
    id: 'sql-adv-ctes',
    section: 'Advanced SQL',
    title: 'CTEs (Common Table Expressions)',
    description: 'Cleaning complex queries.',
    content: `WITH statements to organize logic.`,
    videoTimestamp: '01:34:20',
    points: 250
  },
  {
    id: 'sql-adv-temp',
    section: 'Advanced SQL',
    title: 'Temp Tables',
    description: 'Temporary storage.',
    content: `Speeding up complex multi-step analysis.`,
    videoTimestamp: '01:38:01',
    points: 250
  },
  {
    id: 'sql-adv-strings',
    section: 'Advanced SQL',
    title: 'String Functions (TRIM, REPLACE, SUBSTRING)',
    description: 'Text cleaning.',
    content: `Mastering string manipulation.`,
    videoTimestamp: '01:48:17',
    points: 250
  },
  {
    id: 'sql-adv-stored',
    section: 'Advanced SQL',
    title: 'Stored Procedures',
    description: 'Automation.',
    content: `Saving queries to run later with parameters.`,
    videoTimestamp: '02:02:12',
    points: 250
  },
  {
    id: 'sql-adv-subqueries',
    section: 'Advanced SQL',
    title: 'Subqueries',
    description: 'Nested logic.',
    content: `Queries within queries.`,
    videoTimestamp: '02:08:20',
    points: 300
  },

  // SECTION: PORTFOLIO PROJECTS
  {
    id: 'project-sql-covid',
    section: 'Projects',
    title: 'COVID Data Exploration (SQL)',
    description: 'The Big SQL Project.',
    content: `Apply everything to real-world health data.`,
    videoTimestamp: '02:16:57',
    points: 1000,
    caseStudy: { title: "COVID SQL Scripts", url: "https://github.com/AlexTheAnalyst/PortfolioProjects/blob/main/CovidPortfolioProject.sql" }
  },

  // SECTION: EXCEL
  {
    id: 'excel-pivots',
    section: 'Excel',
    title: 'Pivot Tables',
    description: 'Summary tables.',
    videoTimestamp: '04:30:00',
    content: 'Instant data summaries.',
    points: 100
  },
  {
    id: 'excel-formulas',
    section: 'Excel',
    title: 'Formulas (IF, LEN, SUM, COUNT)',
    description: 'The core functions.',
    videoTimestamp: '04:46:16',
    content: 'Logical and math functions.',
    points: 100
  },
  {
    id: 'excel-lookups',
    section: 'Excel',
    title: 'XLOOKUP vs VLOOKUP',
    description: 'Advanced searching.',
    videoTimestamp: '05:20:17',
    content: 'Connecting tables in spreadsheets.',
    points: 150
  },
  {
    id: 'excel-conditional',
    section: 'Excel',
    title: 'Conditional Formatting',
    description: 'Heatmaps in cells.',
    videoTimestamp: '05:39:03',
    content: 'Highlighting patterns visually.',
    points: 100
  },
  {
    id: 'excel-charts',
    section: 'Excel',
    title: 'Charts',
    description: 'Business viz.',
    videoTimestamp: '06:00:00',
    content: 'Standard visualization techniques.',
    points: 100
  },
  {
    id: 'excel-cleaning',
    section: 'Excel',
    title: 'Clean Data',
    description: 'Prep work.',
    videoTimestamp: '06:15:03',
    content: 'Removing noise from data.',
    points: 100
  },
  {
    id: 'project-excel-dashboard',
    section: 'Projects',
    title: 'Excel Project: Dashboard Creation',
    description: 'Bike Sales Dashboard.',
    videoTimestamp: '06:36:12',
    content: 'Building a full interactive dashboard.',
    points: 1000
  },

  // SECTION: TABLEAU
  {
    id: 'tableau-intro',
    section: 'Tableau',
    title: 'Introduction & First Visualization',
    description: 'Getting started.',
    videoTimestamp: '07:16:59',
    content: 'Connecting to data in Tableau.',
    points: 150
  },
  {
    id: 'tableau-bins',
    section: 'Tableau',
    title: 'Bins & Calculated Fields',
    description: 'Extending data.',
    videoTimestamp: '07:33:53',
    content: 'Logic in Tableau.',
    points: 200
  },
  {
    id: 'tableau-viz',
    section: 'Tableau',
    title: 'Visualizations (Scatter, Density Map)',
    description: 'Beyond bar charts.',
    videoTimestamp: '07:40:27',
    content: 'Map and scatter plot techniques.',
    points: 200
  },
  {
    id: 'tableau-joins',
    section: 'Tableau',
    title: 'JOINs',
    description: 'Data relationships.',
    videoTimestamp: '07:54:20',
    content: 'Table relationships in Tableau.',
    points: 150
  },
  {
    id: 'project-tableau-dashboard',
    section: 'Projects',
    title: 'Tableau Project: Dashboard Creation',
    description: 'Full Tableau Capstone.',
    videoTimestamp: '08:08:52',
    content: 'Building professional reports.',
    points: 1000
  },

  // SECTION: POWER BI
  {
    id: 'pbi-intro',
    section: 'Power BI',
    title: 'Introduction & First Visualization',
    description: 'Setting up.',
    videoTimestamp: '08:53:10',
    content: 'Connecting to data.',
    points: 150
  },
  {
    id: 'pbi-query',
    section: 'Power BI',
    title: 'Power Query (Data Transformation)',
    description: 'ETL engine.',
    videoTimestamp: '09:05:56',
    content: 'Cleaning data with M.',
    points: 200
  },
  {
    id: 'pbi-modeling',
    section: 'Power BI',
    title: 'Relationships (Modeling)',
    description: 'Star Schema.',
    videoTimestamp: '09:19:02',
    content: 'Building the data model.',
    points: 200
  },
  {
    id: 'pbi-dax',
    section: 'Power BI',
    title: 'DAX (Measures & Calculated Columns)',
    description: 'Report logic.',
    videoTimestamp: '09:27:37',
    content: 'Writing DAX expressions.',
    points: 250
  },
  {
    id: 'pbi-bins',
    section: 'Power BI',
    title: 'Bins & Lists',
    description: 'Grouping.',
    videoTimestamp: '09:59:15',
    content: 'Data categorization.',
    points: 150
  },
  {
    id: 'pbi-viz',
    section: 'Power BI',
    title: 'Visualizations',
    description: 'Interactive visuals.',
    videoTimestamp: '10:08:45',
    content: 'Exploration of visual types.',
    points: 150
  },
  {
    id: 'project-pbi-dashboard',
    section: 'Projects',
    title: 'Power BI Project: Final Dashboard',
    description: 'Full Power BI Capstone.',
    videoTimestamp: '10:22:59',
    content: 'Final enterprise report.',
    points: 1000
  },

  // SECTION: PYTHON
  {
    id: 'py-env',
    section: 'Python',
    title: 'Environment Setup',
    description: 'Anaconda/Jupyter.',
    videoTimestamp: '11:05:34',
    content: 'Installation and setup.',
    points: 100
  },
  {
    id: 'py-vars',
    section: 'Python',
    title: 'Variables',
    description: 'Assignments.',
    videoTimestamp: '11:15:34',
    content: 'Storing data in Python.',
    points: 100
  },
  {
    id: 'py-types',
    section: 'Python',
    title: 'Data Types (String, List, Tuple, Dict, Set)',
    description: 'Structures.',
    videoTimestamp: '11:28:57',
    content: 'Python data structures.',
    points: 150
  },
  {
    id: 'py-ops',
    section: 'Python',
    title: 'Operators',
    description: 'Math/Logic.',
    videoTimestamp: '11:50:54',
    content: 'Comparison and membership ops.',
    points: 100
  },
  {
    id: 'py-ifs',
    section: 'Python',
    title: 'IF/ELIF/ELSE Statements',
    description: 'Conditions.',
    videoTimestamp: '11:58:03',
    content: 'Branching logic.',
    points: 100
  },
  {
    id: 'py-loops',
    section: 'Python',
    title: 'FOR Loops & Nested Loops',
    description: 'Iteration.',
    videoTimestamp: '12:04:46',
    content: 'Automatic processing.',
    points: 150
  },
  {
    id: 'py-while',
    section: 'Python',
    title: 'WHILE Loops & Break/Continue',
    description: 'Loop control.',
    videoTimestamp: '12:13:59',
    content: 'Advanced iteration.',
    points: 150
  },
  {
    id: 'py-functions',
    section: 'Python',
    title: 'Functions',
    description: 'Reusable code.',
    videoTimestamp: '12:19:43',
    content: 'Defining your own logic.',
    points: 200
  },
  {
    id: 'project-py-bmi',
    section: 'Projects',
    title: 'Python: BMI Calculator Project',
    description: 'App 1.',
    videoTimestamp: '12:39:03',
    content: 'Practical logic implementation.',
    points: 500
  },
  {
    id: 'project-py-sorter',
    section: 'Projects',
    title: 'Python: Automatic File Sorter Project',
    description: 'App 2.',
    videoTimestamp: '12:53:20',
    content: 'File system automation.',
    points: 750
  },

  // SECTION: WEB SCRAPING
  {
    id: 'scrape-html',
    section: 'Web Scraping',
    title: 'HTML Basics & Inspection',
    description: 'DOM basics.',
    videoTimestamp: '13:10:48',
    content: 'Reading page structures.',
    points: 150
  },
  {
    id: 'scrape-bs4',
    section: 'Web Scraping',
    title: 'Beautiful Soup & Requests',
    description: 'Python tools.',
    videoTimestamp: '13:16:32',
    content: 'Scraping dynamic content.',
    points: 250
  },
  {
    id: 'scrape-pandas',
    section: 'Web Scraping',
    title: 'Scrape Table to Pandas DataFrame',
    description: 'Pipeline.',
    videoTimestamp: '13:35:10',
    content: 'Converting web data to analysis.',
    points: 300
  },

  // SECTION: PANDAS
  {
    id: 'pandas-reading',
    section: 'Pandas',
    title: 'Reading Files (CSV, Excel, JSON)',
    description: 'Ingestion.',
    videoTimestamp: '14:00:36',
    content: 'Importing DataFrames.',
    points: 150
  },
  {
    id: 'pandas-filtering',
    section: 'Pandas',
    title: 'Filtering & Ordering Data',
    description: 'Selection.',
    videoTimestamp: '14:19:54',
    content: 'Slicing your DataFrames.',
    points: 150
  },
  {
    id: 'pandas-indexing',
    section: 'Pandas',
    title: 'Indexing (Loc, ILoc, Multi-Index)',
    description: 'Access patterns.',
    videoTimestamp: '14:31:39',
    content: 'Targeting specific data.',
    points: 200
  },
  {
    id: 'pandas-groupby',
    section: 'Pandas',
    title: 'Group By & Aggregation',
    description: 'Stats.',
    videoTimestamp: '14:43:05',
    content: 'Summarizing data in Python.',
    points: 200
  },
  {
    id: 'pandas-merging',
    section: 'Pandas',
    title: 'Merge, Join & Concatenate',
    description: 'Combination.',
    videoTimestamp: '14:54:20',
    content: 'Linking DataFrames.',
    points: 200
  },
  {
    id: 'pandas-viz',
    section: 'Pandas',
    title: 'Visualizations',
    description: 'Quick charts.',
    videoTimestamp: '15:16:51',
    content: 'Plotting directly in Pandas.',
    points: 200
  },
  {
    id: 'pandas-cleaning',
    section: 'Pandas',
    title: 'Data Cleaning',
    description: 'Prep work.',
    videoTimestamp: '15:33:05',
    content: 'Handling messy data.',
    points: 250
  },
  {
    id: 'pandas-eda',
    section: 'Pandas',
    title: 'Exploratory Data Analysis (EDA)',
    description: 'The full flow.',
    videoTimestamp: '16:11:39',
    content: 'Full dataset understanding.',
    points: 300
  },
  {
    id: 'project-py-amazon',
    section: 'Projects',
    title: 'Portfolio Project: Amazon Web Scraper (Python)',
    description: 'Full Pipeline.',
    videoTimestamp: '16:44:05',
    content: 'Advanced scraping project.',
    points: 1000
  }
];
