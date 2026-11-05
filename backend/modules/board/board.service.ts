import { BoardRepository } from './board.repository.ts';

export class BoardService {
  private readonly repository: Pick<
    BoardRepository,
    'findSnapshot' | 'createDefaultBoard'
  >;

  constructor(repository: BoardService['repository'] = new BoardRepository()) {
    this.repository = repository;
  }

  async getBoard(userId: string) {
    const existing = await this.repository.findSnapshot(userId);
    if (existing) return existing;

    try {
      await this.repository.createDefaultBoard(userId);
    } catch (error) {
      const boardCreatedConcurrently =
        await this.repository.findSnapshot(userId);
      if (boardCreatedConcurrently) return boardCreatedConcurrently;
      throw error;
    }

    const created = await this.repository.findSnapshot(userId);
    if (!created) throw new Error('Board bootstrap completed without a board');
    return created;
  }
}
