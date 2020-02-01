package com.example.boxorderserver.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
public class User implements UserDetails {
	 
	@Id
	private String userName;
	
	@NotNull(message = "password required")
    @Basic(optional = false)
	private String password;

	 @ManyToMany(fetch = FetchType.EAGER)
	 @JoinTable(name = "user_roles",
	           joinColumns =  @JoinColumn(name ="userName"),inverseJoinColumns= @JoinColumn(name="role_id"))
	 private Set<Role> roles;
	
	
	
	 public User(String userName, @NotNull(message = "password required") String password, Set<Role> roles) {
		//super();
		this.userName = userName;
		this.password = password;
		this.roles = roles;
	}


	public User() {}

	 
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String getUsername() {
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
	public Collection<? extends GrantedAuthority> getAuthorities() {
			    List<GrantedAuthority> authorities
			      = new ArrayList<>();
			    for (Role role: roles) {
			        authorities.add(new SimpleGrantedAuthority(role.getName()));
			    }

			    return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	

}
