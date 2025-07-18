function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handlePr(pr) {
    if(!pr) return ''

    return `
        <a
            class="text-sm text-gray-500 hover:underline transition"
            target="_blank"
            href="https://github.com/username/repository/pull/${pr}"
        >
            #${pr}
        </a>
    `
}

// Display users and update counts
function displayPeople(people) {
    const userList = document.getElementById('userList');
    const userCount = document.getElementById('userCount');
    const renameCount = document.getElementById('renameCount');
    const revertCount = document.getElementById('revertCount');
    const userTable = document.getElementById('userTable');

    // Shuffle users for random order
    const shuffledUsers = shuffleArray([...people]);

    userList.innerHTML = shuffledUsers.map(user => `
        <tr class="border-b last:border-b-0"">
            <td class="px-6 py-4 text-lg name-column">${user.name} ${handlePr(user.pr)}</td>
            <td class="px-6 py-4 status-column">
                <span class="${user.rename ? 'tick' : 'cross'}"></span>
            </td>
            <td class="px-6 py-4 status-column">
                <span class="${user.revert ? 'tick' : 'cross'}"></span>
            </td>
        </tr>
    `).join('');

    userCount.textContent = people.length;
    renameCount.textContent = people.filter(user => user.rename).length;
    revertCount.textContent = people.filter(user => user.revert).length;

    // Add hover events for counters
    document.getElementById('renameCounter').addEventListener('mouseenter', () => {
        userTable.classList.add('highlight-rename');
    });
    document.getElementById('renameCounter').addEventListener('mouseleave', () => {
        userTable.classList.remove('highlight-rename');
    });

    document.getElementById('revertCounter').addEventListener('mouseenter', () => {
        userTable.classList.add('highlight-revert');
    });
    document.getElementById('revertCounter').addEventListener('mouseleave', () => {
        userTable.classList.remove('highlight-revert');
    });

    document.getElementById('totalCounter').addEventListener('mouseenter', () => {
        userTable.classList.add('highlight-both');
    });
    document.getElementById('totalCounter').addEventListener('mouseleave', () => {
        userTable.classList.remove('highlight-both');
    });
}

// displayUsers([
//     { name: "John Doe", rename: true, revert: false, pr: 123 },
//     { name: "Jane Smith", rename: false, revert: true, pr: 124 },
//     { name: "Alex Johnson", rename: true, revert: true },
//     { name: "Emma Wilson", rename: false, revert: false, pr: 126 },
//     { name: "Liam Brown", rename: true, revert: true, pr: 127 }
// ])

+async function() {
    const result = await fetch('/people.json')
    const json = await result.json()

    displayPeople(json)
}()
