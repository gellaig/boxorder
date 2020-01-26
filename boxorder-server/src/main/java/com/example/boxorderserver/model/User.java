package com.example.boxorderserver.model;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "userName"
            })
    })
public class User {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	@NotNull(message = "userName required")
	@Basic(optional = false)
	private String userName;
	
	@NotNull(message = "password required")
    @Basic(optional = false)
	private String password;

	public User(Long id, 
			@NotNull(message = "userName required") String userName,
			@NotNull(message = "password required") String password) {
		this.id = id;
		this.userName = userName;
		this.password = password;
	}
	
	 public User() {
	    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + "]";
	}
	

}
