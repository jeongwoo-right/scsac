package com.scsac.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.scsac.app.dto.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "user")
public class UserEntity {

	@Id
	@Column
	private String id;

	@Column(length = 100, nullable = false)
	@JsonIgnore
	private String password;

	@Column(nullable=false, columnDefinition = "INT DEFAULT 3")
	private int authority;

	@Column(nullable = false)
	private int generation;

	@Column(length = 10)
	private String affiliate;

	@Column(length = 45)
	private String name;

	@Column(length = 45)
	private String nickname;

	@Column(length = 100)
	private String bojId;

	public static UserEntity toEntity(User u) {
		return new UserEntity(u.getId(), u.getPassword(), u.getAuthority(), u.getGeneration(), u.getAffiliate(),
				u.getName(), u.getNickname(), u.getBojId());
	}
}
