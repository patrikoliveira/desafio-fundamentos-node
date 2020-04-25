import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balanceCalc = this.transactions.reduce((balance, transaction) => {
      const b = balance;
      if (transaction.type === 'income') {
        b.income += transaction.value;
      } else {
        b.outcome += transaction.value;
      }

      return b;
    }, initialBalance);
    balanceCalc.total = balanceCalc.income - balanceCalc.outcome;
    return balanceCalc;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
