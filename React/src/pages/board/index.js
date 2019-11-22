import React, { Component } from 'react';
import styles from './index.css';
import { Input, Button, Pagination } from 'antd';
import request from '../utils/request';
import moment from 'moment';
const { TextArea } = Input;
class Line extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			editcontent: ''
		};
	}
	onChange = ({ target: { value } }) => {
		this.setState({ editcontent: value });
	};
	deleteLine = async (id) => {
		let req = await request.delete('/deleteComments', {
			data: {
				platform: this.props.platform,
				topic: this.props.topic,
				user: this.props.user,
				secretKey: this.props.secretKey,
				id
			}
		});

		this.props.takeData();
		return req;
	};
	changeLine = async () => {
		let req = await request.post('/changeComments', {
			data: {
				platform: this.props.platform,
				topic: this.props.topic,
				user: this.props.user,
				secretKey: this.props.secretKey,
				id: this.props.lineData.id,
				comment: this.state.editcontent
			}
		});
		this.setState({ edit: !this.state.edit });
		this.props.takeData();

		return req;
	};
	render() {
		return (
			<div className={styles.commentCard} key={this.props.id}>
				<div className={styles.headImg}>{this.props.lineData.user[0]}</div>
				<div className={styles.commentContent}>
					<div className={styles.user}>
						<div className={styles.name}>{this.props.lineData.user}</div>
						<div className={styles.time}>
							{this.props.lineData.createdAt ? (
								moment(this.props.lineData.createdAt).format('YYYY-MM-DD HH:mm:ss')
							) : (
								''
							)}
						</div>
						{this.props.user === this.props.lineData.user ? (
							<div style={{ marginLeft: '20px', display: 'flex' }}>
								{this.state.edit ? (
									<div style={{ color: 'blue', marginLeft: '20px' }} onClick={this.changeLine}>
										保存
									</div>
								) : (
									''
								)}

								<div
									style={{ color: 'blue', marginLeft: '20px' }}
									onClick={() => {
										this.setState({
											edit: !this.state.edit,
											editcontent: this.props.lineData.comment
										});
									}}
								>
									{this.state.edit ? '取消修改' : '修改'}
								</div>

								<div
									style={{ color: 'red', marginLeft: '20px' }}
									onClick={(id) => {
										this.deleteLine(this.props.lineData.id);
									}}
								>
									删除
								</div>
							</div>
						) : (
							''
						)}
					</div>
					{this.state.edit ? (
						<TextArea
							value={this.state.editcontent}
							onChange={this.onChange}
							placeholder="请输入评论"
							autoSize={{ minRows: 3, maxRows: 5 }}
						/>
					) : (
						<p className={styles.comment}>{this.props.lineData.comment}</p>
					)}
				</div>
			</div>
		);
	}
}
class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			lineData: [],

			total: 0,
			page: 1,
			pageSize: 10,
			user: this.props.user
		};
	}

	componentDidMount() {
		this.takeData();
	}

	takeData = async () => {
		let _this = this;
		let req = await request
			.post('/platform/comments', {
				data: {
					platform: this.props.platform,
					topic: this.props.topic,
					type: 'findTopicComment',
					user: this.state.user,
					secretKey: this.props.secretKey,
					skip: (_this.state.page - 1) * _this.state.pageSize,
					take: _this.state.pageSize
				}
			})
			.then(function(response) {
				_this.setState({
					lineData: response[0],
					total: response[1]
				});
			})
			.catch(function(error) {
				console.log(error);
			});
		return req;
	};
	onChange = ({ target: { value } }) => {
		this.setState({ value });
	};
	changeUser = ({ target: { value } }) => {
		this.setState({ user: value });
	};
	submit = async () => {
		let _this = this;
		await request
			.post('/submitComments', {
				data: {
					platform: this.props.platform,
					topic: this.props.topic,
					comment: this.state.value,
					user: this.state.user,
					secretKey: this.props.secretKey
				}
			})
			.then(function(response) {
				_this.takeData();
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	changePage = async (page, pageSize) => {
		await this.setState({
			page,
			pageSize
		});
		this.takeData();
	};
	changeLine = async (id) => {
		let req = await request.delete('/deleteComments', {
			data: {
				platform: this.props.platform,
				topic: this.props.topic,
				user: this.state.user,
				secretKey: this.props.secretKey,
				id
			}
		});
		this.takeData();
		return req;
	};
	render() {
		return (
			<div className={styles.body}>
				<span>————留言板————</span>
				<div className={styles.board}>
					<TextArea
						value={this.state.value}
						onChange={this.onChange}
						placeholder="请输入评论"
						autoSize={{ minRows: 3, maxRows: 5 }}
					/>
					<div className={styles.sendOut}>
						<Button type="primary" onClick={this.submit}>
							留言
						</Button>
					</div>

					<div className={styles.boardHeader}>
						<div>评论数:{this.state.total}</div>
						<div style={{ display: 'flex' }}>
							<span style={{ width: '100px' }}>发言人:</span>
							<Input value={this.state.user} onChange={this.changeUser} />
						</div>
					</div>
					<div className={styles.boardcontent}>
						{this.state.lineData.map((item) => {
							return (
								<Line
									lineData={item}
									user={this.state.user}
									takeData={this.takeData}
									key={item.id}
									platform={this.props.platform}
									topic={this.props.topic}
									secretKey={this.props.secretKey}
								/>
							);
						})}
					</div>
					<Pagination
						showSizeChanger
						defaultCurrent={3}
						total={this.state.total}
						onChange={this.changePage}
						style={{ marginTop: '20px' }}
					/>
				</div>
			</div>
		);
	}
}
export default Board;
