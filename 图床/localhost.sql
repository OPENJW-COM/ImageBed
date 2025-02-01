
--
-- 表的结构 `imghistory`
--

CREATE TABLE `imghistory` (
  `userid` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `imgpath` varchar(500) NOT NULL,
  `filename` varchar(500) NOT NULL,
  `createtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `imghistory`
--
-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `userid` varchar(25) NOT NULL,
  `pass` varchar(40) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `token` varchar(100) NOT NULL,
  `createtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `user`
--


--
-- 转储表的索引
--

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
