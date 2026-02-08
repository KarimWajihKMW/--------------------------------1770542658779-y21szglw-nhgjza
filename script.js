/**
 * Akwadra School Management System v2.0
 */

const app = {
    data: {
        teachers: [
            { id: 1, name: "محمد أحمد العلي", specialty: "رياضيات", grade: "المستوى الثالث", salary: 12000, qualification: "ماجستير" },
            { id: 2, name: "سارة عبدالله الحسين", specialty: "لغة عربية", grade: "المستوى الثاني", salary: 9500, qualification: "بكالوريوس" },
            { id: 3, name: "خالد عمر يوسف", specialty: "فيزياء", grade: "خبير", salary: 15000, qualification: "دكتوراه" },
            { id: 4, name: "نورة فهد السعيد", specialty: "علوم", grade: "المستوى الأول", salary: 8000, qualification: "بكالوريوس" }
        ],
        students: [
            { id: 101, name: "فيصل نواف", stage: "الثانوية", class: "الثاني علمي", guardian: "نواف محمد", status: "منتظم" },
            { id: 102, name: "ليلى سامي", stage: "المتوسطة", class: "الثالث متوسط", guardian: "سامي أحمد", status: "منتظم" },
            { id: 103, name: "عمار ياسر", stage: "الابتدائية", class: "الخامس", guardian: "ياسر علي", status: "متفوق" }
        ]
    },

    init() {
        console.log('Akwadra School System Initialized');
        
        // Preserve original landing page interaction
        const card = document.querySelector('.card');
        if(card) {
             card.addEventListener('click', () => {
                this.enterSystem();
            });
        }

        this.renderStats();
        this.renderTables();
        this.initCharts();
        this.updateDate();
    },

    enterSystem() {
        const landing = document.getElementById('landing-view');
        const dashboard = document.getElementById('dashboard-view');
        
        // Fade out landing
        landing.style.opacity = '0';
        
        setTimeout(() => {
            landing.style.display = 'none';
            dashboard.classList.remove('hidden');
            // Trigger chart resize after visibility change
            window.dispatchEvent(new Event('resize'));
        }, 700);
    },

    switchTab(tabName) {
        // Hide all views
        document.querySelectorAll('.view-section').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Show selected view
        const selectedView = document.getElementById(`view-${tabName}`);
        if(selectedView) {
            selectedView.classList.remove('hidden');
        }

        // Update Sidebar Active State
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active', 'bg-slate-800', 'text-white');
            btn.classList.add('text-slate-300');
            if(btn.dataset.tab === tabName) {
                btn.classList.add('active');
                btn.classList.remove('text-slate-300');
            }
        });

        // Update Title
        const titles = {
            'dashboard': 'لوحة التحكم',
            'teachers': 'إدارة المعلمين والمعلمات',
            'students': 'شؤون الطلاب',
            'grades': 'التحصيل العلمي والدرجات'
        };
        document.getElementById('page-title').innerText = titles[tabName] || 'لوحة التحكم';
    },

    renderTables() {
        // Render Teachers
        const teachersBody = document.getElementById('teachers-table-body');
        teachersBody.innerHTML = this.data.teachers.map(t => `
            <tr class="group hover:bg-indigo-50/50 transition-colors">
                <td class="p-6 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                        ${t.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
                    </div>
                    <span class="font-semibold text-gray-800">${t.name}</span>
                </td>
                <td class="p-6 text-gray-600">${t.specialty}</td>
                <td class="p-6">
                    <span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        ${t.grade}
                    </span>
                </td>
                <td class="p-6 text-gray-600">${t.qualification}</td>
                <td class="p-6 font-bold text-gray-800">${t.salary.toLocaleString()} ر.س</td>
                <td class="p-6">
                    <button class="text-gray-400 hover:text-indigo-600 transition-colors mx-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onclick="app.deleteItem('teachers', ${t.id})" class="text-gray-400 hover:text-red-500 transition-colors mx-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </td>
            </tr>
        `).join('');

        // Render Students
        const studentsBody = document.getElementById('students-table-body');
        studentsBody.innerHTML = this.data.students.map(s => `
             <tr class="group hover:bg-indigo-50/50 transition-colors">
                <td class="p-6 font-semibold text-gray-800">${s.name}</td>
                <td class="p-6">
                    <span class="px-3 py-1 rounded-full text-xs font-medium 
                        ${s.stage === 'الثانوية' ? 'bg-purple-50 text-purple-600' : s.stage === 'المتوسطة' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}">
                        ${s.stage}
                    </span>
                </td>
                <td class="p-6 text-gray-600">${s.class}</td>
                <td class="p-6 text-gray-600">${s.guardian}</td>
                <td class="p-6">
                    <span class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-green-500"></span>
                        ${s.status}
                    </span>
                </td>
                <td class="p-6">
                    <button onclick="app.deleteItem('students', ${s.id})" class="text-gray-400 hover:text-red-500 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </td>
            </tr>
        `).join('');

        this.renderStats();
    },

    renderStats() {
        document.getElementById('stat-teachers-count').innerText = this.data.teachers.length;
        document.getElementById('stat-students-count').innerText = this.data.students.length;
        
        const avgSalary = this.data.teachers.reduce((acc, curr) => acc + curr.salary, 0) / (this.data.teachers.length || 1);
        document.getElementById('stat-avg-salary').innerText = Math.round(avgSalary).toLocaleString() + ' ر.س';
    },

    openModal(type) {
        document.getElementById(`modal-${type}`).classList.remove('hidden');
    },

    closeModal(type) {
        document.getElementById(`modal-${type}`).classList.add('hidden');
    },

    saveTeacher(e) {
        e.preventDefault();
        const form = e.target;
        const newTeacher = {
            id: Date.now(),
            name: form.name.value,
            specialty: form.specialty.value,
            grade: form.grade.value,
            salary: parseInt(form.salary.value),
            qualification: form.qualification.value
        };
        
        this.data.teachers.push(newTeacher);
        this.renderTables();
        this.updateCharts();
        this.closeModal('teacher');
        form.reset();
    },

    saveStudent(e) {
        e.preventDefault();
        const form = e.target;
        const newStudent = {
            id: Date.now(),
            name: form.name.value,
            stage: form.stage.value,
            class: form.class.value,
            guardian: form.guardian.value,
            status: "جديد"
        };
        
        this.data.students.push(newStudent);
        this.renderTables();
        this.updateCharts();
        this.closeModal('student');
        form.reset();
    },

    deleteItem(type, id) {
        if(confirm('هل أنت متأكد من الحذف؟')) {
            this.data[type] = this.data[type].filter(item => item.id !== id);
            this.renderTables();
            this.updateCharts();
        }
    },

    updateDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        document.getElementById('current-date').innerText = today.toLocaleDateString('ar-SA', options);
    },

    // Charts Configuration
    charts: {},
    initCharts() {
        // Student Distribution Chart
        const ctx1 = document.getElementById('studentsChart').getContext('2d');
        this.charts.students = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['الابتدائية', 'المتوسطة', 'الثانوية'],
                datasets: [{
                    data: [35, 30, 35],
                    backgroundColor: ['#60a5fa', '#a78bfa', '#34d399'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });

        // Teacher Specialties Chart
        const ctx2 = document.getElementById('teachersChart').getContext('2d');
        this.charts.teachers = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['رياضيات', 'علوم', 'عربي', 'إسلامية'],
                datasets: [{
                    label: 'عدد المعلمين',
                    data: [4, 3, 5, 2],
                    backgroundColor: '#6366f1',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    },

    updateCharts() {
        // Simple random update simulation for visual effect since we have small data
        if(this.charts.teachers) {
             // In a real app, calculate frequencies from this.data.teachers
             this.charts.teachers.data.datasets[0].data = [
                 this.data.teachers.filter(t => t.specialty === 'رياضيات').length,
                 this.data.teachers.filter(t => t.specialty === 'علوم').length,
                 this.data.teachers.filter(t => t.specialty === 'لغة عربية').length,
                 this.data.teachers.filter(t => t.specialty === 'تربية إسلامية').length + 1 // +1 just to keep chart looking populated if 0
             ];
             this.charts.teachers.update();
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
