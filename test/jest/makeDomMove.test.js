import { MakeDomMove } from '@/index';
test('测试 MakeDomMove', () => {
    let father = document.createElement('div');
    let child = document.createElement('div');
    father.classList.add('father');
    child.classList.add('child');
    document.body.appendChild(father);
    document.body.appendChild(child);
	expect(new MakeDomMove('.father', '.child'))
})