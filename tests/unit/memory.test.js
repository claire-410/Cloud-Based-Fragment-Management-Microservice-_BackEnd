const {writeFragment, readFragment, writeFragmentData, readFragmentData} = require('../../src/model/data/memory/index');


describe('memory', () => {
    const fragment ={ownerId: 'a', id: 'a1', content: 'fragment1'};
    const buffer = Buffer.from([1, 2, 3]);

    test('test readFragment(): should retrieve the fragment data from metadata db', async() => {
        await writeFragment(fragment);
        const result = await readFragment(fragment.ownerId, fragment.id);
        expect(result).toEqual(fragment);
    })

    test('test readFragment(): should return undefined if the fragment does not exit in metadata db', async()=>{
        const result = await readFragment('nonsexistOwner', 'nonsexistId');
        expect(result).toBeUndefined();
    })

    test('test writeFragment(): should store the value that we put in params in metadata db', async() => {
        await writeFragment(fragment);
    })
    
    test('test readFragmentData(): should retrieve the fragment data from data db', async()=>{
        await writeFragmentData(fragment.ownerId, fragment.id, buffer);
        const result = await readFragmentData(fragment.ownerId, fragment.id);
        expect(result).toEqual(buffer);
    })

    test('test readFragmentData(): should return undefined if the fragment does not exit in data db', async()=>{
        const result = await readFragmentData('nonsexistOwner', 'nonsexistId');
        expect(result).toBeUndefined();
    })
    
    test('test writeFragmentData: should store the buffer in data db', async()=>{
        await writeFragmentData(fragment.ownerId, fragment.id, buffer);
    });

})
