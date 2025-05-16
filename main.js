// Sample data: posts with categories
  const posts = [
    {
      id: 1,
      title: "Campus Basketball Team Wins Championship!",
      category: "Sports",
      date: "2024-04-20",
      summary: "Our university BasketUniversity of the Visayas Campus Newsball team won the regional championship after a thrilling final match. Fans celebrated with a parade across campus."
    },
    {
      id: 2,
      title: "New Academic Programs Announced",
      category: "Academics",
      date: "2024-04-18",
      summary: "The administration announced new interdisciplinary academic programs aimed to prepare students for emerging industries."
    },
    {
      id: 3,
      title: "Annual Spring Festival Returns This Weekend",
      category: "Events",
      date: "2024-04-22",
      summary: "With live music, food stalls, and games, the highly anticipated Spring Festival is back to bring fun to students and faculty."
    },
    {
      id: 4,
      title: "Basketball Tryouts Next Week",
      category: "Sports",
      date: "2024-04-25",
      summary: "Interested students should sign up for basketball team tryouts happening next Tuesday and Wednesday in the gym."
    },
    {
      id: 5,
      title: "Guest Lecture on Artificial Intelligence",
      category: "Academics",
      date: "2024-04-19",
      summary: "A renowned AI researcher will give a public lecture detailing the future of machine learning and ethical considerations."
    }
  ];

  // Pages content
  const pages = {
    home: {
      title: "Latest News",
      render: () => {
        return `
          <div class="categories" role="list" aria-label="News categories filter">
            <button class="category-btn active" data-category="All">All</button>
            <button class="category-btn" data-category="Sports">Sports</button>
            <button class="category-btn" data-category="Academics">Academics</button>
            <button class="category-btn" data-category="Events">Events</button>
          </div>
          <section id="posts-feed" aria-live="polite" aria-relevant="additions">
            ${posts.map(post => postCard(post)).join('')}
          </section>
        `;
      }
    },
    about: {
      title: "About Campus News",
      render: () => `
        <article>
          <h2>About Campus News</h2>
          <p>Campus News is your go-to source for student life, academics, sports, and campus events. We are dedicated to keeping the university community informed and connected.</p>
          <p>Our mission is to deliver timely, accurate, and engaging news that matters to you.</p>
        </article>
      `
    },
    contact: {
      title: "Contact Us",
      render: () => `
        <article>
          <h2>Contact Campus News</h2>
          <form id="contact-form" aria-label="Contact form">
            <label for="name">Name:</label><br />
            <input type="text" id="name" name="name" required autocomplete="name" /><br /><br />
            <label for="email">Email:</label><br />
            <input type="email" id="email" name="email" required autocomplete="email" /><br /><br />
            <label for="message">Message:</label><br />
            <textarea id="message" name="message" required rows="5"></textarea><br /><br />
            <button type="submit">Send</button>
          </form>
          <p id="form-status" role="alert" style="color:green; display:none;">Thank you for contacting us! We'll get back to you soon.</p>
        </article>
      `
    }
  };

  // Helper to create post card HTML
  function postCard(post) {
    return `
      <article class="post" tabindex="0" aria-label="${post.title}">
        <h2>${post.title}</h2>
        <div class="meta">
          <time datetime="${post.date}">${new Date(post.date).toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'})}</time>
          &nbsp;&middot;&nbsp;
          <span class="category">${post.category}</span>
        </div>
        <p>${post.summary}</p>
      </article>
    `;
  }

  // Function to render content based on current page or category filter
  function renderPage(page) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = pages[page].render();
    document.title = pages[page].title + " - Campus News";
    updateActiveNav(page);

    if(page === 'home') {
      // attach category filter events
      const categoryButtons = contentArea.querySelectorAll('.category-btn');
      categoryButtons.forEach(btn => btn.addEventListener('click', categoryFilterHandler));
    }

    if(page === 'contact') {
      // attach form submit handler
      const form = contentArea.querySelector('#contact-form');
      const status = contentArea.querySelector('#form-status');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simple form submission simulation
        form.style.display = 'none';
        status.style.display = 'block';
      });
    }
  }

  // Update active nav link styling
  function updateActiveNav(activePage) {
    const links = document.querySelectorAll('nav a.nav-link');
    links.forEach(link => {
      if(link.dataset.page === activePage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Handler for navigation clicks
  document.querySelectorAll('nav a.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = e.target.dataset.page;
      renderPage(page);
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });

  // Handler for category filtering on home page
  function categoryFilterHandler(e) {
    const selectedCategory = e.target.dataset.category;
    const buttons = e.target.parentNode.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const postsFeed = document.getElementById('posts-feed');
    if(selectedCategory === 'All') {
      postsFeed.innerHTML = posts.map(post => postCard(post)).join('');
    } else {
      const filteredPosts = posts.filter(post => post.category === selectedCategory);
      postsFeed.innerHTML = filteredPosts.length ? filteredPosts.map(post => postCard(post)).join('') : '<p>No news articles in this category.</p>';
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Initial render of home page
  renderPage('home');