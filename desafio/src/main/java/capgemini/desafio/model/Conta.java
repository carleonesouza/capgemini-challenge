package capgemini.desafio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "contas")
public class Conta {
	
    private int numero;
    private double saldo;
    private double limite;
    private String tipo;
    private String username;
    private long id;
    
    

    public Conta() {
		super();
	}

	public Conta(int numero, double saldo, double limite, String username, String tipo) {
		super();
		this.numero = numero;
		this.saldo = saldo;
		this.limite = limite;
		this.username = username;
		this.tipo = tipo;
	}

	public void deposita(double valor) {
        this.saldo += valor;
    }

    public boolean saca(double valor) {
        if (valor > getSaldo() + getLimite()) {          
            return false;
        } else {
        	  this.saldo -= valor;
        	  return true;
        }
    }
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	

    public double devolveSaldo() {
        return this.saldo;
    }
    @Column(name = "conta_numero", nullable = false)
	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	@Column(name = "conta_saldo", nullable = false)
	public double getSaldo() {
		return saldo;
	}

	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}

	@Column(name = "conta_limite", nullable = false)
	public double getLimite() {
		return limite;
	}

	public void setLimite(double valor)
    {
        this.limite = valor +this.saldo;
    }

	@Column(name = "conta_username", nullable = false)
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(limite);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(numero);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(saldo);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Conta other = (Conta) obj;
		if (Double.doubleToLongBits(limite) != Double.doubleToLongBits(other.limite))
			return false;
		if (Double.doubleToLongBits(numero) != Double.doubleToLongBits(other.numero))
			return false;
		if (Double.doubleToLongBits(saldo) != Double.doubleToLongBits(other.saldo))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Conta [numero=" + numero + ", saldo=" + saldo + ", limite=" + limite + ", username=" + username + "]";
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

    

}
