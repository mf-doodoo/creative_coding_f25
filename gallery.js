// Example project data
const projects = [
  {
    title: "«Seestücke 16» v1",
    description: "The first re-coding of Anton Bruhin's work.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    link: "creative_coding_f25\Sprint1 v1\index.html"
  },
  {
    title: "«Seestücke 16» v2",
    description: "The second re-coding of Anton Bruhin, updated to include microphone interaction.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    link: "creative_coding_f25\Sprint1 v2\index.html"
  },
    {
    title: "«Seestücke 16» v3",
    description: "The first re-coding of Anton Bruhin's work, updated to include microphone interaction and dynamic colors.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    link: "https://yourportfolio.example.com"
  },
  {
    title: "Move It",
    description: "A browser extension that moves the browser window away from the mouse.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "https://weatherapp.example.com"
  },
  {
    title: "Screamroll",
    description: "A browser extension that disables scrolling by button and mouse wheel. Instead, it uses noise to scroll.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://recipefinder.example.com"
  },
  {
    title: "Tunnelvision",
    description: "A browser extension that creates a tunnel effect on the screen.",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=600&q=80",
    link: "https://taskmanager.example.com"
  },
  {
    title: "Intiernet",
    description: "A browser extension that disables scrolling by button and mouse wheel. Instead, it uses noise to scroll.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://screamo.example.com"
  },
  {
    title: "Screamlock",
    description: "A browser extension that disables scrolling by button and mouse wheel. Instead, it uses noise to scroll.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://screamo.example.com"
  },
  {
    title: "Rhythm Clicker",
    description: "A browser extension that disables scrolling by button and mouse wheel. Instead, it uses noise to scroll.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://screamo.example.com"
  },
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';

  const img = document.createElement('img');
  img.className = 'project-image';
  img.src = project.image;
  img.alt = project.title;

  const content = document.createElement('div');
  content.className = 'project-content';

  const title = document.createElement('h2');
  title.className = 'project-title';
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.className = 'project-desc';
  desc.textContent = project.description;

  const link = document.createElement('a');
  link.className = 'project-link';
  link.href = project.link;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'View Project';

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(link);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  projects.forEach(project => {
    gallery.appendChild(createProjectCard(project));
  });
});
