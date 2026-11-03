document.addEventListener("DOMContentLoaded", () => {
  initStaticSkills();
  initFormValidation();
  fetchProjects();
  initDarkMode();
});

const skillsData = [
  { name: "HTML5 / CSS3", level: "Thành thạo", score: 90 },
  { name: "JavaScript ES6+", level: "Khá", score: 80 },
  { name: "SCSS / Responsive Design", level: "Cơ bản", score: 70 }
];

const initStaticSkills = () => {
  const container = document.getElementById("dynamic-skills");
  if (!container) return;

  const listItems = skillsData
    .filter(skill => skill.score >= 70) 
    .map(skill => `<li><strong>${skill.name}</strong> - Mức độ: ${skill.level} (${skill.score}%)</li>`)
    .join("");

  container.innerHTML = `<p><em>Kỹ năng nổi bật (Render bằng JS):</em></p><ul>${listItems}</ul>`;
};

const initFormValidation = () => {
  const form = document.getElementById("contact-form");
  const responseDiv = document.getElementById("form-response");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullname || !email || !phone || !message) {
      responseDiv.style.color = "red";
      responseDiv.textContent = "Vui lòng điền đầy đủ các thông tin bắt buộc (*).";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      responseDiv.style.color = "red";
      responseDiv.textContent = "Định dạng email không hợp lệ!";
      return;
    }

    responseDiv.style.color = "green";
    responseDiv.textContent = "Cảm ơn bạn! Thông tin liên hệ đã được gửi thành công.";
    form.reset();
  });
};

const fetchProjects = async () => {
  const container = document.getElementById("projects-container");
  if (!container) return;

  try {
    const response = await fetch("js/data.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const projects = await response.json();

    container.innerHTML = projects.map(project => `
      <div class="project-card">
        <h3>${project.ten}</h3>
        <p><strong>Công nghệ:</strong> ${project.congNghe}</p>
        <p><strong>Năm hoàn thành:</strong> ${project.namHoanThanh}</p>
      </div>
    `).join("");

  } catch (error) {
    console.error("Lỗi khi tải dữ liệu dự án:", error);
    container.innerHTML = `<p style="color: red;">Khôn thể tải danh sách dự án. Vui lòng kiểm tra Server Live hoặc file data.json!</p>`;
  }
};

const initDarkMode = () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
};
// --- Xử lý tính năng Đổi giao diện (Dark/Light Mode) & LocalStorage ---
const toggleThemeBtn = document.getElementById('toggle-theme');

if (toggleThemeBtn) {
    // Kiểm tra và áp dụng theme đã lưu từ lần trước
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    toggleThemeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Gán theme mới cho thẻ html
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Lưu trạng thái vào localStorage
        localStorage.setItem('theme', newTheme);
    });
}