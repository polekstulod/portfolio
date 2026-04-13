export const personalInfo = {
	name: 'James Paul L. Tulod',
	title: 'Full-Stack Software Engineer',
	email: 'jpl.tulod@gmail.com',
	location: 'Metro Manila, Philippines',
	about:
		"Full-Stack Software Engineer with 3+ years of industry experience, specializing in PHP, Laravel, Vue.js, and React. Beyond the frontend and backend, I'm comfortable in the DevOps layer too — working with Docker, Linux, and AWS to ship and maintain production-ready systems. I thrive in agile environments, stay proactive, and bring a win-win mindset to every team I'm part of.",
	links: {
		linkedin: 'https://www.linkedin.com/in/paultulod',
		github: 'https://github.com/polekstulod',
		portfolio: 'https://www.jamespaultulod.me',
		resume: '/resume.pdf'
	}
};

export const skills = [
	{ category: 'Web Development', items: ['PHP', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Python'] },
	{
		category: 'Frameworks/Libraries',
		items: ['Vue.js', 'React', 'Laravel', 'Symfony', 'CodeIgniter', 'Express']
	},
	{ category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'] },
	{
		category: 'Tools & DevOps',
		items: ['Docker', 'AWS', 'Linux', 'Git', 'GitHub', 'Jira', 'Azure']
	}
];

export const experience = [
	{
		company: 'Electronic Transfer and Advanced Processing Inc. (eTap Inc.)',
		role: 'Jr. Research and Development Engineer',
		date: 'January 2025 – Present',
		description: [
			'Architected and implemented advanced feature enhancements for a high-volume B2B online cash disbursement system, leveraging Laravel API architecture and Vue.js frontend.',
			'Engineered an innovative automated employee request management system by strategically integrating Google Workspace ecosystem (Google Sheets, Drive, Apps Script) and geolocation APIs.'
		]
	},
	{
		company: 'Electronic Transfer and Advanced Processing Inc. (eTap Inc.)',
		role: 'Junior Software Engineer',
		date: 'April 2024 – December 2024',
		description: [
			'Engineered a comprehensive feature enhancement for an existing open-source HRIS built with Symfony and VueJS, developing a sophisticated employee benefits reimbursement system.',
			'Developed an innovative visitor management solution by strategically integrating Google Workspace tools.'
		]
	},
	{
		company: 'Technomancer Inc.',
		role: 'Analyst Programmer',
		date: 'May 2023 – January 2024',
		description: [
			'Diagnosed and resolved critical system vulnerabilities in a PHP CodeIgniter-based accounting platform.',
			'Conceptualized and developed a sophisticated Shopify application for recipe management using React and Node.js with SQLite integration.',
			'Architected a dynamic blog feature for an e-commerce website using Laravel and Vue.'
		]
	},
	{
		company: 'Technomancer Inc.',
		role: 'Analyst Programmer Intern',
		date: 'March 2023 – May 2023',
		description: [
			'Completed intensive CodeIgniter and Laravel training.',
			'Collaborated directly with clients to translate complex business requirements into technical solutions.'
		]
	}
];

export const projects = [
	{
		title: 'myPUPQC: Student Portal',
		role: 'Lead Developer',
		techStack: ['NodeJS', 'Express', 'PostgreSQL', 'Sequelize'],
		description: 'Student Portal for PUPQC. Awarded Best in Capstone Project.'
	},
	{
		title: 'Foodtrip: Food Ordering Web App',
		role: 'Backend Developer',
		techStack: ['NodeJS', 'Express', 'MySQL', 'Sequelize'],
		description: 'Backend implementation for a food ordering web application.'
	},
	{
		title: 'RxPress: Online Medicine Web App',
		role: 'Backend Developer',
		techStack: ['Vanilla PHP', 'MySQL'],
		description:
			'Created exclusively using vanilla PHP, utilizing Stored Procedures, UDFs, and Views.'
	}
];
