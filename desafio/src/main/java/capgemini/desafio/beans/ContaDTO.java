package capgemini.desafio.beans;

import java.io.Serializable;

public class ContaDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    private int numero;
    private double saldo;
    private double limite;
    private String tipo;
    private double valor;
    private String username;
    private long id;
    
    


	public ContaDTO() {
		super();
	}

	public ContaDTO(int numero, double saldo, double limite, String username, long id, String tipo) {
		super();
		this.numero = numero;
		this.saldo = saldo;
		this.limite = limite;
		this.username = username;
		this.setTipo(tipo);
		this.id = id;
	}

	public void deposita() {
        this.saldo += this.valor;
    }

    public boolean saca() {
        if (valor > getSaldo() + getLimite()) {          
            return false;
        } else {
        	  this.saldo -= this.valor;
        	  return true;
        }
    }

    public double devolveSaldo() {
        return this.saldo;
    }

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public double getSaldo() {
		return saldo;
	}

	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}

	public double getLimite() {
		return limite;
	}

	public void setLimite(double valor)
    {
        this.limite = valor +this.saldo;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}
	

    
    

}
