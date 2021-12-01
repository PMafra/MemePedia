import Filter from 'bad-words';
import * as memeService from '../../src/services/memeService.js';
import * as memeRepository from '../../src/repository/memeRepository.js';
import * as userRepository from '../../src/repository/userRepository.js';

const sut = memeService;
jest.mock('bad-words');

describe('memeService test', () => {
    it('Should return no memes object for limit = 0 ', async () => {
        const result = await sut.listMemes(0);
        expect(result).toEqual({
            message: 'No memes today!',
            data: []
        });
    });

    it('Should return no memes object for limit = -1 ', async () => {
        const result = await sut.listMemes(-1);
        expect(result).toEqual({
            message: 'No memes today!',
            data: []
        });
    });

    it('Should return no memes object for limit = 1 and empty list of memes', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => {
            return []
        });
        const result = await sut.listMemes(1);
        expect(result).toEqual({
            message: 'No memes today!',
            data: []
        });
    });

    it('Should return list of memes object for limit = 1 and existing meme', async () => {
        const meme = ['meme1'];
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => {
            return meme;
        });
        const result = await sut.listMemes(1);
        expect(result).toEqual({
            message: 'List all memes',
            data: meme,
        });
    });
});