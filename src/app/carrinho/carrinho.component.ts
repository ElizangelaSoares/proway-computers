import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit{
  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;
  
  constructor(
    public carrinhoService: CarrinhoService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calculaTotal();
  }

  calculaTotal(){
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (prev + curr.preco * curr.quantidade), 0);
  }

  removeProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calculaTotal();
  }

  comprar(){
    alert("Parabéns, você finalizou sua compra!");
    this.carrinhoService.limparCarrinho();
    this.route.navigate(["produtos"]);
  }
}
