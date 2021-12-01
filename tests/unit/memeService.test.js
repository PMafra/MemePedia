import * as memeService from '../../src/services/memeService.js';
import * as memeRepository from '../../src/repository/memeRepository.js';
import * as userRepository from '../../src/repository/userRepository.js';

const sut = memeService;
jest.mock('bad-words');

describe('memeService test', () => {

    //LIST MEMES FUNCTION

    const mockNoMemesResponse = {
        message: 'No memes today!',
        data: []
    };

    it('Should return no memes object for limit = 0 ', async () => {
        const result = await sut.listMemes(0);
        expect(result).toEqual(mockNoMemesResponse);
    });

    it('Should return no memes object for limit = -1 ', async () => {
        const result = await sut.listMemes(-1);
        expect(result).toEqual(mockNoMemesResponse);
    });

    it('Should return no memes object for limit = 1 and empty list of memes', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => {
            return []
        });
        const result = await sut.listMemes(1);
        expect(result).toEqual(mockNoMemesResponse);
    });

    it('Should return no memes object for limit = undefined', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => {
            return []
        });
        const result = await sut.listMemes(undefined);
        expect(result).toEqual(mockNoMemesResponse);
    });

    it('Should return list of memes object for limit = 1 and existing meme', async () => {
        const mockMeme = ['meme1'];
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => {
            return mockMeme;
        });
        const result = await sut.listMemes(1);
        expect(result).toEqual({
            message: 'List all memes',
            data: mockMeme,
        });
    });

    // INSERT MEME FUNCTION 

    it('Should return no user object for user session not found', async () => {
        jest.spyOn(userRepository, 'findUserByTokenSession').mockImplementationOnce(() => {
            return [];
        });
        const result = await sut.insertMeme();
        expect(result).toEqual({
            message: 'No user!',
            data: []
        });
    });

    it('Should return new meme object for valid user', async () => {
        const mockNewMeme = ['new meme'];
        jest.spyOn(userRepository, 'findUserByTokenSession').mockImplementationOnce(() => {
            return ['valid user'];
        });
        jest.spyOn(memeRepository, 'insertMeme').mockImplementationOnce(() => {
            return mockNewMeme;
        });
        const result = await sut.insertMeme('token', 'url', 'text');
        expect(result).toEqual({
            message: 'New meme indahouse',
            data: mockNewMeme,
        });
    });
});