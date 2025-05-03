export class Cliente {
  static tableName = 'clientes'

  static columns = {
    id: 'TEXT PRIMARY KEY', // UUID como string
    nome: 'TEXT NOT NULL',
    email: 'TEXT',
    telefone: 'TEXT',
    criado_em: 'TEXT DEFAULT CURRENT_TIMESTAMP',
  }
}

export class Produto {
  static tableName = 'produtos'

  static columns = {
    id: 'TEXT PRIMARY KEY', // UUID como string
    nome: 'TEXT NOT NULL',
    preco: 'REAL',
    estoque: 'INTEGER DEFAULT 0',
    criado_em: 'TEXT DEFAULT CURRENT_TIMESTAMP',
  }
}
